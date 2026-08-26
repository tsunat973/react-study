import axios from "axios";
import Image from "next/image";
import { MicrocmsResponse, QiitaResponse } from "@/domain/Article";
import { Suspense } from "react";

async function QiitaArticle() {
  const response = await axios.get<QiitaResponse[]>(
    "https://qiita.com/api/v2/items?query=user:Sicut_study&per_page=4",
    {
      headers: {
        "Authorization": `Bearer ${process.env.QIITA_API_KEY}`
      }
    }
  );
  const items = response.data.map((item) => ({
    id: item.id,
    title: item.title,
    url: item.url,
    image: "https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F810513%2F04c6ef92-7b08-467f-95b0-efd05a0e7ea4.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&w=1400&fit=max&s=255a4084e07534dc5871b77aa1318d0e"
  }));
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <Image src={item.image} alt={item.title} width={100} height={100} />
          <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
        </li>
      ))}
    </ul>
  )
}

async function BlogArticles() {
  const response = await axios.get<MicrocmsResponse>(
    "https://gsnz1d1ua1.microcms.io/api/v1/blogs",
    {
      headers: {
        "X-MICROCMS-API-KEY": `${process.env.MICROCMS_API_KEY}`
      }
    }
  );

  const items = response.data.contents.map((item) => ({
    id: item.id,
    title: item.title,
    url: `/blogs/${item.id}`,
    image: item.eyecatch.url

  }));
  return (
    <ul>
     {items.map((item) => (
        <li key={item.id}>
          <Image src={item.image} alt={item.title} width={100} height={100} />
          <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
        </li>
      ))}
    </ul>
  )
}

export default async function Home() {


  return (
    <div>
      <h1>Topページ</h1>
      <h2>Qiita記事</h2>
      <Suspense fallback={<div>loading...</div>}>
        <QiitaArticle />
      </Suspense>
      <h2>ブログ記事</h2>

      <Suspense fallback={<div>loading...</div>}>
        <BlogArticles />
      </Suspense>
    </div>
  )
}

