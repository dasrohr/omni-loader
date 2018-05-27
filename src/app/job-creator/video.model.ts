export class Video {
  public id: any;
  public title: string;
  public provider: string;
  public imageUrl: string;
  
  constructor(id: any, title :string, provider :string, imageUrl :string) {
    this.id = id.videoId ? id.videoId : id;
    this.title = title;
    this.provider = provider || 'youtube';
    this.imageUrl = imageUrl;
  }
}

