import { Router } from "express";
import { timer } from "../utils/timer";
import { authRoutes } from "./auth.routes";
import { bookRoutes } from "./book.routes";
import { rentRoutes } from "./rent.routes";
import { userRoutes } from "./user.routes";

const router = Router();

router.get("/", (req, res) => {
  return res.json({ message: "OK" });
});

router.use(timer);

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/book", bookRoutes);
router.use("/rent", rentRoutes);

export { router };
