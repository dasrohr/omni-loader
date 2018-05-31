import { moment } from "ngx-bootstrap/chronos/test/chain";

export class Video {
  public id :any;
  public title :string;
  public provider :string;
  public imageUrl :string;
  public albart :string;
  public alb :string;
  public date :string;
  
  constructor(id :any, title :string, provider :string, imageUrl :string, albart :string, alb :string) {
    const defaultAlbart = moment().format('YYYY-MM');
    const defaultAlb = moment().format('YYYY-WW');

    this.id = id.videoId ? id.videoId : id;
    this.title = title;
    this.provider = provider || 'youtube';
    this.imageUrl = imageUrl;
    this.albart = albart || defaultAlbart;
    this.alb = alb || defaultAlb;
    this.date = moment().format('YYYY-MM-DD HH:mm:SS');
  }
}

