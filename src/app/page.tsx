'use client'

import BookItem from "@/components/BookItem";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import Input from "@/components/Input";
import apiService from "@/utils/api-service";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    year: '',
    isbn: '',
    is_read: false
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [readBookList, setReadBookList] = useState<{
    id: string;
    title: string;
    author: string;
    year: string;
    isbn: string;
    is_read: boolean;
  }[]>([]);
  const [unreadBookList, setUnreadBookList] = useState<{
    id: string;
    title: string;
    author: string;
    year: string;
    isbn: string;
    is_read: boolean;
  }[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<{
    id: string;
    title: string;
    author: string;
    year: string;
    isbn: string;
    is_read: boolean;
  } | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      if (isEdit) {
        await handleEditBookData();
      } else {
        await handleCreateBookData();
      }
    } catch (error) {
      console.error('error: ', error);
    } finally {
      setIsLoading(false);
      setIsEdit(false);
      getReadBookList();
      getUnreadBookList();
    }
  }

  const handleCreateBookData = async () => {
    const response = await apiService.post('/book', formData);
    const responseStatusText = response.statusText;
    const responseData = response.data;

    if (responseStatusText == 'Created' && responseData) {
      resetFormData();
    }
  }

  const handleEditBookData = async () => {
    const response = await apiService.patch(`/book/${selectedBook?.id}`, formData);
    const responseStatusText = response.statusText;
    const responseData = response.data;

    if (responseStatusText == 'OK' && responseData) {
      resetFormData();
    }
  }

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name == 'is_read' ? checked : value
    }));
  }

  const resetFormData = () => {
    setFormData({
      title: '',
      author: '',
      year: '',
      isbn: '',
      is_read: false
    })
  }

  useEffect(() => {
    getReadBookList();
    getUnreadBookList();
  }, [])

  const getReadBookList = async () => {
    const response = await apiService.get('/book', {
      params: {
        is_read: true
      }
    });

    const responseStatusText = response.statusText;
    const responseData = response.data?.data;

    if (responseStatusText == 'OK' && responseData) {
      setReadBookList(responseData);
    }
  }

  const getUnreadBookList = async () => {
    const response = await apiService.get('/book', {
      params: {
        is_read: false
      }
    });

    const responseStatusText = response.statusText;
    const responseData = response.data?.data;

    if (responseStatusText == 'OK' && responseData) {
      setUnreadBookList(responseData);
    }
  }

  const handleSelectBook = async (id: string, event: string) => {
    try {
      const response = await apiService.get(`/book/${id}`);

      const responseStatusText = response.statusText;
      const responseData = response.data?.data;

      if (responseStatusText == 'OK' && responseData) {
        setSelectedBook(responseData);
        setIsEdit(event == 'edit' ? true : false);
      }
    } catch (error) {
      console.error('error: ', error);
    }
  }

  useEffect(() => {
    if (isEdit && selectedBook != null) {
      setFormData({
        title: selectedBook.title,
        author: selectedBook.author,
        year: selectedBook.year,
        isbn: selectedBook.isbn,
        is_read: selectedBook.is_read
      })
    } else {
      resetFormData();
    }
  }, [isEdit, selectedBook])

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

        <div className="w-full h-auto flex flex-col items-start justify-start gap-[24px] p-[25px] bg-white max-h-[500px] overflow-y-auto">
          {readBookList?.map((book) => (
            <BookItem
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              year={book.year}
              isbn={book.isbn}
              onEdit={(id) => handleSelectBook(id, 'edit')}
              onDelete={(id) => handleSelectBook(id, 'delete')}
            />
          ))}
        </div>
      </div>

      {/* Unread Book Shelf */}
      <div className="w-full h-auto flex flex-col items-start justify-start rounded-[24px] overflow-hidden border-[1px] border-gray-400">
        <div className="w-full h-auto p-[25px] bg-blue-500 border-b-[1px] border-gray-400">
          <p className="text-left text-[22px] leading-[28px] font-bold text-white">
            Unread Book Shelf
          </p>
        </div>

        <div className="w-full h-auto flex flex-col items-start justify-start gap-[24px] p-[25px] bg-white max-h-[500px] overflow-y-auto">
          {unreadBookList?.map((book) => (
            <BookItem
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              year={book.year}
              isbn={book.isbn}
              onEdit={(id) => handleSelectBook(id, 'edit')}
              onDelete={(id) => handleSelectBook(id, 'delete')}
            />
          ))}
        </div>
      </div>
    </div>
  )
}