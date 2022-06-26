package com.wirepicksmartpay.helper.enums;


/**
 * This class contains the process types under Tmu
 *
 * @Author MututwaM
 */
public class TmuProcessType {

	//Manual Suspension Reactivation process types
	public static final String SUSPENSION = "SUSPENSION";
	public static final String REACTIVATION = "REACTIVATION";

	//Exception list process types
	public static final String ADD_EXCEPTION = "ADD_EXCEPTION";
	public static final String REMOVE_EXCEPTION = "REMOVE_EXCEPTION";

	//Tpin Appeals process types
	public static final String APPEAL_MANUAL_BLOCKING = "APPEAL_MANUAL_BLOCKING";
	public static final String APPEAL_AUTOMATIC_BLOCKING = "APPEAL_AUTOMATIC_BLOCKING";

	private TmuProcessType() {
	}
}
