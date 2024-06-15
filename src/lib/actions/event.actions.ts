"use server";
import { CreateEventParams, UpdateEventParams } from "@/types";
import { connectToDatabase } from "../database/mongoose";
import User from "../database/models/user.model";
import Event from "../database/models/event.model";
import { revalidatePath } from "next/cache";
import { handleError } from "../utils";
import Category from "../database/models/category.model";

const populateEvent = (query: any) => {
  return query
    .populate({
      path: "organizer",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({ path: "category", model: Category, select: "_id name" });
};

export async function createEvent({ event, path, userId }: CreateEventParams) {
  try {
    await connectToDatabase();
    const organizer = await User.findById(userId);
    if (!organizer) throw new Error("Organizer not found");

    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      orginizer: userId,
    });

    revalidatePath(path);
    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
}

export async function getEventById(id: string) {
  try {
    await connectToDatabase();
    const event = await populateEvent(Event.findById(id));
    if (!event) throw new Error("Event not found");
    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    handleError(error);
  }
}

export async function updateEvent({ event, path, userId }: UpdateEventParams) {
  try {
    await connectToDatabase();
    const existingEvent = await Event.findById(event._id);
    if (!existingEvent) throw new Error("Event not found");

    if (existingEvent.orginizer.toString() !== userId) {
      throw new Error("You are not authorized to update this event");
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      event._id,
      { ...event, category: event.categoryId },
      { new: true }
    );

    revalidatePath(path);
    return JSON.parse(JSON.stringify(updatedEvent));
  } catch (error) {
    handleError(error);
  }
}
