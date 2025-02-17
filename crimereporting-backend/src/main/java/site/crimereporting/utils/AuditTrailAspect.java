package site.crimereporting.utils;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import site.crimereporting.dtos.ApiResponse;
import site.crimereporting.dtos.CrimeReportResponseDTO;
import site.crimereporting.dtos.RegisterResponseDTO;
import site.crimereporting.entity.Citizen;
import site.crimereporting.entity.PoliceStation;
import site.crimereporting.entity.PoliceStationUser;
import site.crimereporting.entity.User;
import site.crimereporting.service.AuditService;
import site.crimereporting.service.AuditServiceImpl;

@Aspect
@Component
public class AuditTrailAspect {

	@Autowired
	private AuditService auditService;

	@AfterReturning(value = "execution(* site.crimereporting.service.UserServiceImpl.registerCitizen(..))", returning = "returnedCitizen")
	public void citizenRegisterTrail(JoinPoint joinPoint, ApiResponse<RegisterResponseDTO> returnedCitizen) {
		auditService.citizenRegistration(returnedCitizen);
	}

	@AfterReturning(value = "execution(* site.crimereporting.service.UserServiceImpl.registerPolice(..))", returning = "returnedPolice")
	public void PoliceRegisterTrail(JoinPoint joinPoint, ApiResponse<RegisterResponseDTO> returnedPolice) {
		auditService.citizenRegistration(returnedPolice);
	}

	@AfterReturning(value = "execution(* site.crimereporting.service.UserServiceImpl.verifyOtp(..))", returning = "returnedUser")
	public void afterVerifyOtp(JoinPoint joinPoint, ApiResponse<User> returnedUser) {
		if (returnedUser != null && returnedUser.getData() != null) {
			auditService.userLogin(returnedUser);
		}
	}
	
	@AfterReturning(value = "execution(* site.crimereporting.service.ReportServiceImpl.newReport(..))", returning = "returnedCrimeReport")
	public void crimeReportTrail(JoinPoint joinPoint, ApiResponse<CrimeReportResponseDTO> returnedCrimeReport) {
		auditService.newCrimeReport(returnedCrimeReport);
	}
	
	@AfterReturning(value = "execution(* site.crimereporting.service.AdminServiceImpl.updatePoliceStation(..))", returning = "returnedPoliceStation")
	public void policeStationUpdateTrail(JoinPoint joinPoint, ApiResponse<PoliceStation> returnedPoliceStation) {
		auditService.policeStationUpdate(returnedPoliceStation);
	}
	
}
