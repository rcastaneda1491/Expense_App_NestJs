/* eslint-disable prettier/prettier */
import { data, ReportType } from "src/data"
import { Injectable } from "@nestjs/common"
import { v4 as uuid } from "uuid"
import { ReportResponseDTO } from "src/dtos/report.dto"

interface ReportData { amount: number, source: string }
interface UpdateReportData { amount?: number, source?: string }

@Injectable()
export class ReportService {
    getAllReports(type: ReportType): ReportResponseDTO[] {
        return data.report.filter((report) => report.type === type).map(report => new ReportResponseDTO(report));
    }

    getReportById(type: ReportType, id: string): ReportResponseDTO {
        const report = data.report.filter((report) => report.type === type).find((report) => report.id === id);

        if (!report) return

        return new ReportResponseDTO(report);
    }

    createReport({ amount, source }: ReportData, type: ReportType): ReportResponseDTO {
        const newReport = {
            id: uuid(),
            source,
            amount,
            created_at: new Date(),
            updated_at: new Date(),
            type: type
        }

        data.report.push(newReport);
        return new ReportResponseDTO(newReport);
    }

    updateReport(type: ReportType, id: string, body: UpdateReportData): ReportResponseDTO {
        const reportToUpdate = data.report.filter((report) => report.type === type).find((report) => report.id === id);

        if (!reportToUpdate) return

        const reportIndex = data.report.findIndex((report) => report.id === reportToUpdate.id);
        data.report[reportIndex] = {
            ...data.report[reportIndex],
            ...body,
            updated_at: new Date()
        }

        return new ReportResponseDTO(data.report[reportIndex]);
    }

    deleteReport(id: string) {

        const reportIndex = data.report.findIndex(report => report.id === id);
        if (reportIndex === -1) return

        data.report.splice(reportIndex, 1)

        return 'deleted';
    }
}
