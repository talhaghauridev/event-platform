import { Model, Schema, model, models, Document } from "mongoose";
import { IUser } from "./user.model";
import { ICategory } from "./category.model";

export interface IEvent extends Document {
  title: string;
  description: string;
  location: string;
  createdAt: Date;
  imageUrl: string;
  statDateTime: Date;
  endDateTime: Date;
  price: string;
  isFree: boolean;
  url: string;
  category: Schema.Types.ObjectId | Pick<ICategory, "_id" | "name">;
  orginizer:
    | Schema.Types.ObjectId
    | Pick<IUser, "_id" | "lastName" | "firstName">;
}

const EventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  statDateTime: {
    type: Date,
    default: Date.now,
  },
  endDateTime: {
    type: Date,
    default: Date.now,
  },
  price: {
    type: String,
  },
  isFree: {
    type: Boolean,
    default: false,
  },
  url: {
    type: String,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  orginizer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Event: Model<IEvent> = models.Event || model("Event", EventSchema);

export default Event;
