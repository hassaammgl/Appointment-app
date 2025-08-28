// import { AppError, ValidationError } from '../utils/AppError.js';
// import {
//     validateReqMeeting,
//     validateCancelReq,
//     validateApproveAndRej,
//     validateUpdatePriority,
//     validateGetReqsByRole
// } from "../utils/joi-validtaion.js"
// import {
//     updateAppointmentPriority,
//     getRoles,
//     createMettings,
//     getAllMettings,
//     cancelMettingReq,
//     approveRejectMettingReq,
//     getReqsWithUserRole
// } from "../services/metting.service.js"
// import Status from "http-status-codes"

// export const createMettingReq = async (req, res, next) => {
//     try {
//         try {
//             const metting = await createMettings(req.body);
//             res.status(201).json({ message: 'Appointment created 🎉', metting });
//         } catch (dbError) {
//             if (dbError.code === 11000) {
//                 throw new ValidationError('Something happened in database but try to change their values');
//             } else if (dbError.name === 'MongoError') {
//                 throw new AppError('Database error occurred', 500);
//             }
//             throw dbError;
//         }
//     } catch (err) {
//         next(err);
//     }
// };

// export const getAllRoles = async (req, res, next) => {
//     try {
//         try {
//             const roles = await getRoles()
//             res.status(200).json({
//                 message: "Users getting successfully 🎉",
//                 roles
//             })
//         } catch (dbError) {
//             if (dbError.code === 11000) {
//                 throw new ValidationError('Something happened in database');
//             } else if (dbError.name === 'MongoError') {
//                 throw new AppError('Database error occurred', 500);
//             }
//             throw dbError;
//         }
//     } catch (err) {
//         next(err);
//     }
// }

// export const getAllMeetingsReq = async (req, res, next) => {
//     try {
//         try {
//             const allMettings = await getAllMettings();
//             // console.log(allMettings);

//             res.status(200).json({ message: 'All appointments fetched 🎉', allMettings });
//         } catch (dbError) {
//             if (dbError.code === 11000) {
//                 throw new ValidationError('Something happened in database but try to change their values');
//             } else if (dbError.name === 'MongoError') {
//                 throw new AppError('Database error occurred', 500);
//             }
//             throw dbError;
//         }
//     } catch (err) {
//         next(err);
//     }
// };

// export const cancelMeetingReq = async (req, res, next) => {
//     try {
//         // console.log("canceling meeting req");
//         // console.log(req.params.id);

//         const { error } = validateCancelReq({ _id: req.params.id });
//         if (error) {
//             // console.log(error);
//             throw new ValidationError(error.details.map(detail => detail.message).join(', '));
//         }
//         try {
//             const respose = await cancelMettingReq(req.params.id)
//             if (respose) {
//                 res.status(Status.OK).json({ message: 'Request Deleted 🎉', success: true });
//             }
//             else {
//                 throw new AppError("Error while deleting")
//             }
//         } catch (dbError) {
//             if (dbError.code === 11000) {
//                 throw new ValidationError('Something happened while canceling in db');
//             } else if (dbError.name === 'MongoError') {
//                 throw new AppError('Database error occurred', 500);
//             }
//             throw dbError;
//         }
//     } catch (err) {
//         next(err);
//     }
// };

// export const approveMeetingReq = async (req, res, next) => {
//     try {
//         // console.log("Approving Req");
//         // console.log(req.params.id);

//         const { error } = validateApproveAndRej({ _id: req.params.id });
//         if (error) {
//             // console.log(error);
//             throw new ValidationError(error.details.map(detail => detail.message).join(', '));
//         }
//         try {
//             const respose = await approveRejectMettingReq(req.params.id, "approved")
//             if (respose) {
//                 res.status(Status.OK).json({ message: 'Request Approved 🎉', success: true });
//             }
//             else {
//                 throw new AppError("Error while Approving")
//             }
//         } catch (dbError) {
//             if (dbError.code === 11000) {
//                 throw new ValidationError('Something happened while approving in db');
//             } else if (dbError.name === 'MongoError') {
//                 throw new AppError('Database error occurred', 500);
//             }
//             throw dbError;
//         }
//     } catch (err) {
//         next(err);
//     }
// };

// export const rejectMeetingReq = async (req, res, next) => {
//     try {
//         // console.log("Rejecting Req");
//         // console.log(req.params.id);
//         const { error } = validateApproveAndRej({ _id: req.params.id });
//         if (error) {
//             // console.log(error);
//             throw new ValidationError(error.details.map(detail => detail.message).join(', '));
//         }
//         try {
//             const respose = await approveRejectMettingReq(req.params.id, "rejected")
//             if (respose) {
//                 res.status(Status.OK).json({ message: 'Request Rejected 🎉', success: true });
//             }
//             else {
//                 throw new AppError("Error while Approving")
//             }
//         } catch (dbError) {
//             if (dbError.code === 11000) {
//                 throw new ValidationError('Something happened while canceling in db');
//             } else if (dbError.name === 'MongoError') {
//                 throw new AppError('Database error occurred', 500);
//             }
//             throw dbError;
//         }
//     } catch (err) {
//         next(err);
//     }
// };

// export const updatePriorityOfReq = async (req, res, next) => {
//     try {
//         // console.log(req.params.id);
//         // console.log(req.body.data);

//         const { error } = validateUpdatePriority({ _id: req.params.id, value: req.body.data });
//         if (error) {
//             // console.log(error);
//             throw new ValidationError(error.details.map(detail => detail.message).join(', '));
//         }
//         try {
//             const respose = await updateAppointmentPriority(req.params.id, req.body.data)
//             if (respose) {
//                 res.status(Status.OK).json({ message: 'Priority Updated 🎉', success: true });
//             }
//             else {
//                 throw new AppError("Error while Updating")
//             }
//         } catch (dbError) {
//             if (dbError.code === 11000) {
//                 throw new ValidationError('Something happened while canceling in db');
//             } else if (dbError.name === 'MongoError') {
//                 throw new AppError('Database error occurred', 500);
//             }
//             throw dbError;
//         }
//     } catch (err) {
//         next(err);
//     }
// };

// export const getReqsByRolesWithPagination = async (req, res, next) => {
//     try {
//         // console.log(req.params.id);
//         const { error } = validateGetReqsByRole({
//             _id: req.params.id
//         });
//         if (error) {
//             // console.log(error);
//             throw new ValidationError(error.details.map(detail => detail.message).join(', '));
//         }
//         try {
//             const response = await getReqsWithUserRole(req.params.id)
//             if (response) {
//                 res.status(Status.OK).json({ success: true, mettings: response });
//             }
//             else {
//                 throw new AppError("Error while Updating")
//             }
//         } catch (dbError) {
//             if (dbError.code === 11000) {
//                 throw new ValidationError('Something happened while fetching data from db');
//             } else if (dbError.name === 'MongoError') {
//                 throw new AppError('Database error occurred', 500);
//             }
//             throw dbError;
//         }
//     } catch (err) {
//         next(err);
//     }
// }

import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import {
	updateAppointmentPriority,
	getRoles,
	createMettings,
	getAllMettings,
	cancelMettingReq,
	approveRejectMettingReq,
	getReqsWithUserRole,
} from "../services/metting.service";
// import Status from "http-status-codes";
import type { UserRole } from "../models/user.model";
import { IAppointment } from "../models/appointments.model";

// Types for request bodies and responses
interface CreateMeetingBody {
	visitorName: string;
	visitorNo?: string;
	visitorCnic?: string;
	purpose?: string;
	createdBy: string;
	notes?: string;
	to: string;
}

interface UpdatePriorityBody {
	data: number;
}

interface ApiResponse<T = any> {
	message: string;
	success?: boolean;
	metting?: T;
	allMettings?: T;
	roles?: T;
	mettings?: T;
}

interface DatabaseError extends Error {
	code?: number;
	name: string;
}

export class MeetingController {
	/**
	 * Create a new meeting request
	 */
	public async createMettingReq(
		req: Request<{}, ApiResponse, CreateMeetingBody>,
		res: Response<ApiResponse>,
		next: NextFunction
	): Promise<void> {
		try {
			try {
				const metting = await createMettings(req.body);
				res.status(201).json({
					message: "Appointment created 🎉",
					metting,
				});
			} catch (dbError: unknown) {
				this.handleDatabaseError(
					dbError,
					"Something happened in database but try to change their values"
				);
			}
		} catch (err: unknown) {
			next(err);
		}
	}

	/**
	 * Get all user roles
	 */
	public async getAllRoles(
		req: Request,
		res: Response<ApiResponse>,
		next: NextFunction
	): Promise<void> {
		try {
			try {
				const roles = await getRoles();
				res.status(200).json({
					message: "Users getting successfully 🎉",
					roles,
				});
			} catch (dbError: unknown) {
				this.handleDatabaseError(
					dbError,
					"Something happened in database"
				);
			}
		} catch (err: unknown) {
			next(err);
		}
	}

	/**
	 * Get all meeting requests
	 */
	public async getAllMeetingsReq(
		req: Request,
		res: Response<ApiResponse>,
		next: NextFunction
	): Promise<void> {
		try {
			try {
				const allMettings = await getAllMettings();
				res.status(200).json({
					message: "All appointments fetched 🎉",
					allMettings,
				});
			} catch (dbError: unknown) {
				this.handleDatabaseError(
					dbError,
					"Something happened in database but try to change their values"
				);
			}
		} catch (err: unknown) {
			next(err);
		}
	}

	/**
	 * Cancel a meeting request
	 */
	public async cancelMeetingReq(
		req: Request<{ id: string }>,
		res: Response<ApiResponse>,
		next: NextFunction
	): Promise<void> {
		try {
			try {
				const response = await cancelMettingReq(req.params.id);
				if (response) {
					res.status(200).json({
						message: "Request Deleted 🎉",
						success: true,
					});
				} else {
					throw new AppError("Error while deleting", 500);
				}
			} catch (dbError: unknown) {
				this.handleDatabaseError(
					dbError,
					"Something happened while canceling in db"
				);
			}
		} catch (err: unknown) {
			next(err);
		}
	}

	/**
	 * Approve a meeting request
	 */
	public async approveMeetingReq(
		req: Request<{ id: string }>,
		res: Response<ApiResponse>,
		next: NextFunction
	): Promise<void> {
		try {
			try {
				const response = await approveRejectMettingReq(
					req.params.id,
					"approved"
				);
				if (response) {
					res.status(200).json({
						message: "Request Approved 🎉",
						success: true,
					});
				} else {
					throw new AppError("Error while Approving", 500);
				}
			} catch (dbError: unknown) {
				this.handleDatabaseError(
					dbError,
					"Something happened while approving in db"
				);
			}
		} catch (err: unknown) {
			next(err);
		}
	}

	/**
	 * Reject a meeting request
	 */
	public async rejectMeetingReq(
		req: Request<{ id: string }>,
		res: Response<ApiResponse>,
		next: NextFunction
	): Promise<void> {
		try {
			try {
				const response = await approveRejectMettingReq(
					req.params.id,
					"rejected"
				);
				if (response) {
					res.status(200).json({
						message: "Request Rejected 🎉",
						success: true,
					});
				} else {
					throw new AppError("Error while Rejecting", 500);
				}
			} catch (dbError: unknown) {
				this.handleDatabaseError(
					dbError,
					"Something happened while rejecting in db"
				);
			}
		} catch (err: unknown) {
			next(err);
		}
	}

	/**
	 * Update priority of a meeting request
	 */
	public async updatePriorityOfReq(
		req: Request<{ id: string }, ApiResponse, UpdatePriorityBody>,
		res: Response<ApiResponse>,
		next: NextFunction
	): Promise<void> {
		try {
			try {
				const response = await updateAppointmentPriority(
					req.params.id,
					req.body.data
				);
				if (response) {
					res.status(200).json({
						message: "Priority Updated 🎉",
						success: true,
					});
				} else {
					throw new AppError("Error while Updating", 500);
				}
			} catch (dbError: unknown) {
				this.handleDatabaseError(
					dbError,
					"Something happened while updating in db"
				);
			}
		} catch (err: unknown) {
			next(err);
		}
	}

	/**
	 * Get requests by role with pagination
	 */
	// public async getReqsByRolesWithPagination(
	// 	req: Request<{ id: string }>,
	// 	res: Response<ApiResponse>,
	// 	next: NextFunction
	// ): Promise<void> {
	// 	try {
	// 		try {
	// 			const response = await getReqsWithUserRole(req.params.id);
	// 			if (response) {
	// 				res.status(200).json({
	// 					success: true,
	// 					mettings: response,
	// 				});
	// 			} else {
	// 				throw new AppError("Error while fetching data", 500);
	// 			}
	// 		} catch (dbError: unknown) {
	// 			this.handleDatabaseError(
	// 				dbError,
	// 				"Something happened while fetching data from db"
	// 			);
	// 		}
	// 	} catch (err: unknown) {
	// 		next(err);
	// 	}
	// }

	/**
	 * Handle database errors consistently
	 */
	private handleDatabaseError(
		dbError: unknown,
		defaultMessage: string
	): void {
		const error = dbError as DatabaseError;

		if (error.code === 11000) {
			throw new AppError(defaultMessage, 500);
		} else if (error.name === "MongoError") {
			throw new AppError("Database error occurred", 500);
		}
		throw dbError;
	}
}

// Export singleton instance
export const meetingController = new MeetingController();

// Export individual methods for backward compatibility
// export const {
// 	createMettingReq,
// 	getAllRoles,
// 	getAllMeetingsReq,
// 	cancelMeetingReq,
// 	approveMeetingReq,
// 	rejectMeetingReq,
// 	updatePriorityOfReq,
// 	getReqsByRolesWithPagination,
// } = meetingController;
