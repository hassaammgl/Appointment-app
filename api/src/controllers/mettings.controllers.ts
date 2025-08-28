import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { meetingService } from "../services/metting.service";

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
	message?: string;
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
				console.log(req.body);

				const metting = await meetingService.createMeeting(req.body);
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
				const roles = await meetingService.getRoles();
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
				const allMettings = await meetingService.getAllMeetings();
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
				const response = await meetingService.cancelMeetingReq(
					req.params.id
				);
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
				const response = await meetingService.approveRejectMeetingReq(
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
				const response = await meetingService.approveRejectMeetingReq(
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
				const response = await meetingService.updateAppointmentPriority(
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
	public async getReqsByRolesWithPagination(
		req: Request<{ id: string }>,
		res: Response<ApiResponse>,
		next: NextFunction
	): Promise<void> {
		try {
			try {
				const response = await meetingService.getReqsWithUserRole(
					req.params.id
				);
				if (response) {
					res.status(200).json({
						success: true,
						mettings: response,
					});
				} else {
					throw new AppError("Error while fetching data", 500);
				}
			} catch (dbError: unknown) {
				this.handleDatabaseError(
					dbError,
					"Something happened while fetching data from db"
				);
			}
		} catch (err: unknown) {
			next(err);
		}
	}
}

export const meetingController = new MeetingController();
