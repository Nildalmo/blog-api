import { Router} from "express";
import * as postControllers from "../../controllers/postController";
import { apiAuth } from "../../middlewares/apiAuth";

const postRoutes = Router();

postRoutes.get("/posts", postControllers.getPosts);
postRoutes.get("/posts/:id", postControllers.getPostById);
postRoutes.post("/posts", apiAuth, postControllers.createPost);
postRoutes.put("/posts/:id", apiAuth, postControllers.updatePost);
postRoutes.delete("/posts/id", apiAuth, postControllers.deletePost);
postRoutes.put("/posts/:id/midias", apiAuth, postControllers.uploadMedia);

export {postRoutes};