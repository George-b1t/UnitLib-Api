import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { userRoutes } from "./user.routes";

const router = Router();

router.get("/", (req, res) => {
  return res.json({ message: "OK" });
});

router.use("/auth", authRoutes);
router.use("/user", userRoutes);

export { router };
