import mongoose from "mongoose";

// Kitab şeması
const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Kitab adı mütləq olmalıdır
  },
  price: {
    type: Number,
    required: true, // Qiymət mütləq olmalıdır
  },
  description: {
    type: String,
    // required: true, // Əlavə təsvir (opsional edə bilərsiniz)
  },
  pageCount: {
    type: Number,
    // required: true, // Səhifə sayı (opsional edə bilərsiniz)
  },
  category: {
    type: String,
    // required: true, // Kateqoriya (opsional edə bilərsiniz)
  },
  publishDate: {
    type: Date,
    // required: true, // Nəşr tarixi (opsional edə bilərsiniz)
  },
  author: {
    type: String,
    required: true, // Müəllif adı mütləq olmalıdır
  },
  language: {
    type: String,
    required: true, // Dil mütləq olmalıdır
  },
  stockCount: {
    type: Number,
    // required: true, // Mövcud olan kitab sayı mütləq olmalıdır
  },
  imageUrl: {
    type: String,
    required: true, // Şəkil URL-si mütləq olmalıdır
  },
});

// Modelin təkrarlanmasının qarşısını alır
export const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);
