"use client"

import { QiitaResponse } from "@/domain/Article"
import axios from "axios";
import { useEffect, useState } from "react"
import Image from "next/image";
const Qiita = () => {
  const [qiitaItems, setQiitaItems] = useState<QiitaResponse[]>([]);

  const fetcQiitaItems = async () => {
    const response = await axios.get<QiitaResponse[]>(
      "https://qiita.com/api/v2/items?query=user:Sicut_study&per_page=20",{
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_QIITA_API_KEY}`,
        },
      }
    )

    return response.data;
  };

  useEffect(() => {
    fetcQiitaItems().then((items) =>
    setQiitaItems(
      items.map((item) => ({
        id: item.id,
        title: item.title,
        url: item.url,
        image:
        "https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F810513%2F04c6ef92-7b08-467f-95b0-efd05a0e7ea4.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&w=1400&fit=max&s=255a4084e07534dc5871b77aa1318d0e",
      }))
    )
  );
  }, []);
  return (
    <div>
      <h1>Qiitaページ</h1>
      <ul>
        {qiitaItems.map((item) => (
          <li key={item.id}>
            <Image src={item.image} width={100} height={100} alt="" />
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}


export default Qiita;