'use client'

import BookItem from "@/components/BookItem";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import Input from "@/components/Input";
import apiService from "@/utils/api-service";
import React, { useState } from "react";

export default function Page() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    year: '',
    isbn: '',
    is_read: false
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsLoading(true);
      event.preventDefault();

      const response = await apiService.post('/book', formData);
      const responseStatusText = response.statusText;
      const responseData = response.data;

      if (responseStatusText == 'Created' && responseData) {
        resetForm();
      } 
    } catch (error) {
      console.log('error: ', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name == 'is_read' ? checked : value
    }));
  }

  const resetForm = () => {
    setFormData({
      title: '',
      author: '',
      year: '',
      isbn: '',
      is_read: false
    })
  }

  return (
    <div className="w-full h-auto max-w-[728px] mx-auto flex flex-col items-start justify-start p-[25px] gap-[24px]">
      {/* Book Form */}
      <div className="w-full h-auto flex flex-col items-start justify-start rounded-[24px] overflow-hidden border-[1px] border-gray-400">
        <div className="w-full h-auto p-[25px] bg-blue-500 border-b-[1px] border-gray-400">
          <p className="text-left text-[22px] leading-[28px] font-bold text-white">
            Book Form
          </p>
        </div>

        <form
          className="w-full h-auto flex flex-col items-start justify-start gap-[24px] p-[25px] bg-white"
          onSubmit={handleSubmit}
        >
          <div className="w-full h-auto flex flex-col items-start justify-start gap-[16px]">
            <Input
              id="title"
              name="title"
              label="Title"
              placeholder="Atomic Habits"
              value={formData.title}
              onChange={handleChangeInput}
            />
            <Input
              id="author"
              name="author"
              label="Author"
              placeholder="James Clear"
              value={formData.author}
              onChange={handleChangeInput}
            />
            <Input
              id="year"
              name="year"
              label="Year"
              placeholder="2018"
              value={formData.year}
              onChange={handleChangeInput}
            />
            <Input
              id="isbn"
              name="isbn"
              label="ISBN"
              placeholder="978-602-06-3318-3"
              value={formData.isbn}
              onChange={handleChangeInput}
            />
            <Checkbox
              id="is_read"
              name="is_read"
              label="Is Read"
              isChecked={formData.is_read}
              onChange={handleChangeInput}
            />
          </div>
          <div className="w-full h-auto flex flex-col items-start justify-start">
            <Button
              label="Submit"
              htmlType="submit"
              isLoading={isLoading}
            />
          </div>
        </form>
      </div>

      {/* Read Book Shelf */}
      <div className="w-full h-auto flex flex-col items-start justify-start rounded-[24px] overflow-hidden border-[1px] border-gray-400">
        <div className="w-full h-auto p-[25px] bg-blue-500 border-b-[1px] border-gray-400">
          <p className="text-left text-[22px] leading-[28px] font-bold text-white">
            Read Book Shelf
          </p>
        </div>

        <div className="w-full h-auto flex flex-col items-start justify-start gap-[24px] p-[25px] bg-white">
          <BookItem
            title="Atomic Habits"
            author="James Clear"
            year="2018"
            isbn="978-602-06-3318-3"
          />
        </div>
      </div>

      {/* Unread Book Shelf */}
      <div className="w-full h-auto flex flex-col items-start justify-start rounded-[24px] overflow-hidden border-[1px] border-gray-400">
        <div className="w-full h-auto p-[25px] bg-blue-500 border-b-[1px] border-gray-400">
          <p className="text-left text-[22px] leading-[28px] font-bold text-white">
            Unread Book Shelf
          </p>
        </div>

        <div className="w-full h-auto flex flex-col items-start justify-start gap-[24px] p-[25px] bg-white">
          <BookItem
            title="Atomic Habits"
            author="James Clear"
            year="2018"
            isbn="978-602-06-3318-3"
          />
        </div>
      </div>
    </div>
  )
}