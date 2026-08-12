"use client";

import { useState } from "react";
import type { PageRecord } from "@/data/pages/types";
import { LocationIcon, PhoneIcon, EmailIcon } from "@/components/sites/vn-loccitane-com-1c965340/shared/icons";

// Real contact details from the live page's own "Thông tin liên hệ" sidebar — not fabricated.
const CONTACT_INFO = {
  address: "32 Ấp 4, Đường Liên ấp 3-4 Xã An Viễn, Trảng Bom, Đồng Nai",
  phone: "0911 024 272",
  email: "vn.customerservice@loccitane.com",
};

export function ContactForm({ page }: { page: PageRecord }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <article>
      <h1 className="mb-6 text-center text-3xl font-medium text-foreground">{page.title}</h1>

      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-base font-semibold text-foreground">
            Gửi thắc mắc cho chúng tôi
          </h2>

          {submitted ? (
            <p className="rounded-[5px] bg-secondary p-4 text-sm text-foreground">
              Cảm ơn bạn đã liên hệ! Đây là bản demo tái tạo giao diện — tin nhắn này không được gửi
              đi thật, chức năng liên hệ thực tế không nằm trong phạm vi dự án.
            </p>
          ) : (
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <div>
                <label htmlFor="contactFormName" className="mb-1 block text-sm text-foreground">
                  Họ và tên
                </label>
                <input
                  required
                  type="text"
                  id="contactFormName"
                  placeholder="Nhập tên của bạn"
                  className="w-full rounded-[5px] border border-border px-3 py-2 text-sm focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="contactFormPhone" className="mb-1 block text-sm text-foreground">
                  Số điện thoại
                </label>
                <input
                  required
                  type="tel"
                  id="contactFormPhone"
                  placeholder="Nhập số điện thoại của bạn"
                  className="w-full rounded-[5px] border border-border px-3 py-2 text-sm focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="contactFormEmail" className="mb-1 block text-sm text-foreground">
                  Email
                </label>
                <input
                  required
                  type="email"
                  id="contactFormEmail"
                  placeholder="Nhập email của bạn"
                  className="w-full rounded-[5px] border border-border px-3 py-2 text-sm focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="contactFormMessage" className="mb-1 block text-sm text-foreground">
                  Nội dung
                </label>
                <textarea
                  required
                  id="contactFormMessage"
                  placeholder="Nội dung..."
                  rows={4}
                  className="w-full rounded-[5px] border border-border px-3 py-2 text-sm focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="rounded-[5px] bg-foreground px-6 py-2.5 text-sm font-medium text-white"
              >
                Gửi liên hệ
              </button>
            </form>
          )}
        </div>

        <div>
          <h2 className="mb-4 text-base font-semibold text-foreground">Thông tin liên hệ</h2>
          <ul className="space-y-4 text-sm text-foreground">
            <li className="flex items-start gap-3">
              <LocationIcon className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Địa chỉ</p>
                <p>{CONTACT_INFO.address}</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <PhoneIcon className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Số điện thoại</p>
                <p>{CONTACT_INFO.phone}</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <EmailIcon className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Email</p>
                <p>{CONTACT_INFO.email}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </article>
  );
}
