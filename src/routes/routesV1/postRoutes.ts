import { Router} from "express";
import * as postControllers from "../../controllers/postController";

const postRoutes = Router();

postRoutes.get("/posts", postControllers.getPosts);
postRoutes.get("/posts/:id", postControllers.getPostById);
postRoutes.post("/posts", postControllers.createPost);
postRoutes.put("/posts/:id", postControllers.updatePost);
postRoutes.delete("/posts/id", postControllers.deletePost);

export {postRoutes};