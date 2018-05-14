export class Job {
  public name: String;
  public id: String;
  public imagePath: String;
  public url: String;

  constructor (name: String, id: String, imagePath: String) {
    this.name = name;
    this.id = id;
    this.imagePath = imagePath;
  }
}