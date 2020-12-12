package com.cibertec.dao;

import com.cibertec.model.ResetToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IResetTokenDAO extends JpaRepository<ResetToken, Long>{

	/**
	 * Este metodo pemite obtener el objeto ResetToken segun la url(token).
	 * @param token
	 * @return
	 */
	//from RestToken where token = :? 	
	ResetToken findByToken(String token);

}
