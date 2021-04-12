import moment from 'moment';

class Product{
    constructor(id, ownerId, title, description, videoUrl, caption, likes, numComments, posts) {
        this.id = id;
        this.ownerId = ownerId;
        this.title = title;
        this.description = description;
        this.videoUrl = videoUrl;
        this.caption = caption;
        this.likes = likes;
        this.numComments = numComments;
        this.posts = posts;
    }

    get readableDate() {
        return moment(this.date).startOf('hour').from;
    }
}

export default Product;