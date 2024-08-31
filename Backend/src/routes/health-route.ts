import { Router } from "express";

const router = Router()


router.get("/", (_, res) => {
    res.json("The server looks healthy!")
})

export default router
