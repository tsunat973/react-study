export type QiitaResponse = {
  id: string;
  title: string;
  url: string;
  image: string;
}

type MicrocmsContent = {
  id: string;
  title: string;
  eyecatch: {
    url: string;
  };
};

export type MicrocmsResponse = {
  contents: MicrocmsContent[];
}