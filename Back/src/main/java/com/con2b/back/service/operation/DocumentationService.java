package com.con2b.back.service.operation;

import com.con2b.back.model.operation.Documentation;
import com.con2b.back.repository.operation.DocumentationRepository;
import com.con2b.back.repository.operation.OperationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
public class DocumentationService {

    private String sourcePath = "2B/docs";
    @Autowired
    private DocumentationRepository documentationRepository;
    @Autowired
    private OperationRepository operationRepository;

    public Documentation saveDocumentation(Documentation documentation){
        return documentationRepository.save(documentation);
    }

    public Documentation saveFile(MultipartFile file, Long userId) throws IOException {
        StringBuilder builder = new StringBuilder();
        builder.append(sourcePath);
        builder.append("/");
        builder.append(userId);
        builder.append("/");
        builder.append(file.getOriginalFilename().toString());

        byte[] fileBytes = file.getBytes();
        Path path = Paths.get(builder.toString());
        Path parentDir = path.toAbsolutePath().getParent();
        if (!Files.exists(parentDir))
            Files.createDirectories(parentDir);

        Files.write(path.toAbsolutePath(), fileBytes);

        return documentationRepository.save(new Documentation(null, builder.toString()));

    }

    public Documentation updatePathFile(Documentation documentation, Long operationId) throws IOException {
        String string = documentation.getPath();
        String[] parts = string.split("/");
        StringBuilder builder = new StringBuilder();
        builder.append(sourcePath);
        builder.append("/");
        builder.append(parts[2]);//userId
        builder.append("/");
        builder.append(operationId);
        builder.append("/");
        builder.append(parts[3]); //fileName

        Path source = Paths.get(documentation.getPath()).toAbsolutePath();
        Path dest = Paths.get(builder.toString()).toAbsolutePath();

        Path parentDir = dest.getParent();
        if (!Files.exists(parentDir))
            Files.createDirectories(parentDir);

        Files.move(source, dest);
        documentation.setPath(builder.toString());
        documentation.setOperation(operationRepository.findById(operationId).get());
        return documentationRepository.save(documentation);
    }

    public Set<Documentation> getAllDocumentsById(Set<Long> documentId) {
        return new HashSet<>(documentationRepository.findAllById(documentId));
    }

    public Documentation getDocumentationById(Long id){
        Optional<Documentation> doc = documentationRepository.findById(id);
        return doc.get();
    }

    public Boolean deleteFile(Long documentationId) throws IOException {
        Documentation documentation = getDocumentationById(documentationId);
        Path path = Paths.get(documentation.getPath()).toAbsolutePath();
        documentationRepository.delete(documentation);
        return Files.deleteIfExists(path);
    }
}
