package com.eecs.pcshop.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class ImageService {

    private final File imageDir;

    public ImageService(@Value("${image.path}") String imagePath) {
        this.imageDir = new File(imagePath);
        if (!imageDir.exists() && !imageDir.mkdirs())
            throw new IllegalStateException("Could not create directory: " + imageDir);
    }

    public File uploadImage(MultipartFile file, String prefix) throws IOException {
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image")) {
            throw new IllegalArgumentException("Invalid content type. Must be an image.");
        }
        String extension = "." + contentType.split("/")[1];
            File tempFile = File.createTempFile(prefix, extension, imageDir);
            file.transferTo(tempFile);
            return tempFile;
    }
}
