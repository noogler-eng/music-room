type song = {
  active: boolean;
  bigImg: string;
  extractedId: string;
  id: Number;
  smallImg: string;
  title: string;
  type: string;
  upvotes: {
    id: Number;
    streamId: Number;
    userId: Number;
  }[];
  url: string;
  userId: Number;
  _count: {
    upvotes: number;
  };
}

export default song