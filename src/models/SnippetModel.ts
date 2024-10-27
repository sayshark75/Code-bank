// models/Link.ts
import { Schema, Document, model, models } from "mongoose";

export interface SnippetsType extends Document {
  code: string;
  tags: string[];
  title: string;
  author: string;
  language: string;
  description: string;
  deleted: boolean;
}

const SnippetsSchema: Schema = new Schema({
  title: { type: String, required: true },
  deleted: { type: Boolean, default: false },
  author: { type: String, default: "anonymous" },
  tags: [{ type: String }],
  language: { type: String, required: true },
  code: { type: String, required: true },
  description: { type: String, required: true },
});

const SnippetsModel = models.snippets || model<SnippetsType>("snippets", SnippetsSchema);

export default SnippetsModel;
