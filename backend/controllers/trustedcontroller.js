import Trusted from "../models/trustedmodel.js";

function uploadedPath(file, fallback) {
    if (file) return `/uploads/${file.filename}`;
    return fallback;
}

export const createTrusted = async function (req, res) {
    try {
        const city = req.body.city?.trim();
        const username = req.body.username?.trim();
        const description = req.body.description?.trim();
        const trustedimage = uploadedPath(req.file, req.body.trustedimage);

        if (!city || !username || !description) {
            return res.status(400).json({ message: "City, username, and description are required" });
        }

        if (!trustedimage) {
            return res.status(400).json({ message: "Trusted image is required" });
        }

        const trusted = await Trusted.create({
            city: city,
            username: username, 
            description: description,
            trustedimage: trustedimage
        });
        res.status(201).json({ message: "Trusted Brand created successfully", data: trusted });
    
    }
    catch (error) {
        res.status(500).json({ message: "error creating trusted brand", error: error.message })
    }
    
}

export const getTrusted = async function (req, res) {
    try {
        const trusted = await Trusted.findAll({ order: [["createdAt", "DESC"]] })
        res.status(200).json(trusted);
    } catch (error) {
        res.status(500).json({ message: "error fetching trusted brands", error: error.message });
    }
}

export const getTrustedById = async function (req, res) {
    try {
        const trustedbyid = await Trusted.findByPk(req.params.id);
        if (!trustedbyid) {
            return res.status(404).json({ message: "not found" })
        }
        res.status(200).json(trustedbyid);
    }
    catch (error) {
        res.status(500).json({
            message: "error fetching trusted brand",
            error: error.message
        })
    }
}


export const updatetrusted = async function (req, res) {
    try {
        const trusted = await Trusted.findByPk(req.params.id);
        if (!trusted) {
            return res.status(404).json({ message: "not found" })
        }

        const city = req.body.city?.trim();
        const username = req.body.username?.trim();
        const description = req.body.description?.trim();
        const trustedimage = uploadedPath(req.file, req.body.trustedimage);

        if (!city || !username || !description) {
            return res.status(400).json({ message: "City, username, and description are required" });
        }

        await trusted.update({
            city: city,
            username: username,
            description: description,
            trustedimage: trustedimage || trusted.trustedimage
        });

        res.status(200).json({ message: "Trusted Brand updated successfully", data: trusted });
    }
    catch (error) { 
        res.status(500).json({
            message: "error updating trusted brand",
            error: error.message
        })
    }
}

export const deletetrusted = async function (req, res) {
    try {
        const trusted = await Trusted.findByPk(req.params.id);
        if (!trusted) {
            return res.status(404).json({ message: "not found" })
        }

        await trusted.destroy();
        res.status(200).json({ message: "Trusted Brand deleted successfully" });
    }
    catch (error) {
        res.status(500).json({
            message: "error deleting trusted brand",
            error: error.message
        })
    }
}
