package com.con2b.back.service.operation;

import com.con2b.back.model.operation.Documentation;
import com.con2b.back.repository.operation.DocumentationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class DocumentationService {

    @Autowired
    private DocumentationRepository documentationRepository;

    public Documentation saveDocumentation(Documentation documentation){
        return documentationRepository.save(documentation);
    }
}
