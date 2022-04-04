import { useEffect, useState } from "react";
import { ArticleThumbnailProps } from "../ArticleThumbnail/ArticleThumbnail.types";
import { Button } from "../Button";
import { Input } from "../Input";
import { RitchTextEditor } from "../RitchTextEditor";

type ArticleFormProps = {
  article?: ArticleThumbnailProps;
  onSubmit?: (article: ArticleThumbnailProps) => void;
  onClick: () => void;
}

export const ArticleForm: React.FC<ArticleFormProps> = ({
  article,
  onSubmit,
  onClick
}) => {
  const [titulo, setTitulo] = useState("");
  const [resumo, setResumo] = useState("");
  const [imagem, setImagem] = useState("");
  const [conteudo, setConteudo] = useState("");

  useEffect(() => {
    if (article) {
      setTitulo(article.titulo);
      setResumo(article.resumo);
      setImagem(article.imagem);
      setConteudo(article.conteudo || '');
    }
  }, [article]);

  // criamos um novo evento para este componente: sempre que o usuário 
  // fizer o submit do form, vamos enviar para o componente pai o artigo
  // que deve ser submetido.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSubmit) {
      const articleToSubmit = {
        ...article,
        titulo,
        resumo,
        imagem,
        conteudo,
      };
      onSubmit(articleToSubmit as ArticleThumbnailProps)
    }
  }

  const transformaImagemEmBase64 = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event: any) => {
      setImagem(event.target.result);
    };
  };
  return (
    <div className="grid min-h-screen mx-10 ">
      <div>
        <h1 className="text-xl font-semibold">
          Hello there 👋,&nbsp;
          <span className="font-normal">please fill in your information to continue</span>
        </h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          {/* Adicionamos o estado e o evento de alteração em todos os campos. */}
          <Input
            placeholder="Digite aqui o título"
            type="text"
            name="titulo"
            label="Titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
          <Input
            placeholder="Breve rewsumo do artigo"
            type="textarea"
            name="resumo"
            label="Resumo"
            value={ resumo }
            onChange={(e) => setResumo(e.target.value)}
            required
          />

          <Input
            placeholder="Breve rewsumo do artigo"
            type="file"
            name="image"
            label="Banner"
            onChange={transformaImagemEmBase64}
            required
          />

          <RitchTextEditor
            label="Conteúdo"
            name="conteudo"
            value={ conteudo }
            onChange={ setConteudo }
          />

          <Button type="submit">Salvar</Button>
          <Button 
            type="submit" 
            color={`
              w-full mt-6 tracking-widest
              border-b-blue-600 bg-blue-500 py-3 text-white font-bold
              hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400
            `}
          >Salvar</Button>
          <Button 
            type="button" 
            color={`
              w-full mt-6 tracking-widest
              border-b-red-600 bg-red-500 py-3 text-white font-bold
              hover:bg-red-400 active:translate-y-[0.125rem] active:border-b-red-400
            `}
            onClick={onClick}
            >Deletar</Button>
        </form>
      </div>
    </div>
  );
};