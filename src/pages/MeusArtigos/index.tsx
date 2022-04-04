import apiClient from '../../services/api-client';
import { useEffect, useState } from "react";

import { ArticleList } from "../../components/ArticleList";
import { ArticleThumbnailProps } from "../../components/ArticleThumbnail/ArticleThumbnail.types";
import { NoPublications } from '../NoPublications';

export const MeusArtigosPage = () => {
  const [ articles, setArticles ] = useState<ArticleThumbnailProps[]>([]);
  const [ load, setLoad] = useState(false);

  async function buscaMeusArtigos() {
    const response = await apiClient.get<ArticleThumbnailProps[]>(
         '/artigos/meus-artigos'
       );
    setArticles(response.data);
    if(articles.length === 0){
      setLoad(false);
    } else {
      setLoad(true);
    }
  };
  
  useEffect(() => {
    buscaMeusArtigos();
  }, [articles]);

  return (
    <div className="my-30">
      {load ? <ArticleList articles={articles} /> : <NoPublications />}
    </div>
  );
};


