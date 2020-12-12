package com.cibertec.service;

import com.cibertec.model.ResetToken;

public interface IResetTokenService{

	ResetToken findByToken(String token);
	
	void guardar(ResetToken token);
	
	void eliminar(ResetToken token);

}
