package com.sinosteel.metallurgical.personnel.repository;

import org.springframework.stereotype.Repository;

import com.sinosteel.framework.core.base.repository.BaseRepository;
import com.sinosteel.metallurgical.personnel.domain.Resume;

@Repository("ResumeRepository")
public interface ResumeRepository extends BaseRepository<Resume>
{

}
