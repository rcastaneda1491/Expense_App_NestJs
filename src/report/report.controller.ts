/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe, ParseEnumPipe } from "@nestjs/common";
import { ReportType } from "src/data"
import { ReportService } from "./report.service"
import { CreateReportDTO, UpdateReportDTO, ReportResponseDTO } from "src/dtos/report.dto"

@Controller("report/:type")
export class ReportController {

    constructor(private readonly reportService: ReportService) { }

    @Get()
    getAllReports(@Param("type", new ParseEnumPipe(ReportType)) type: string): ReportResponseDTO[] {
        const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
        return this.reportService.getAllReports(reportType);
    }

    @Get(':id')
    getReportById(
        @Param("type", new ParseEnumPipe(ReportType)) type: string,
        @Param("id", ParseUUIDPipe) id: string
    ): ReportResponseDTO {
        const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
        return this.reportService.getReportById(reportType, id);
    }

    @Post()
    createReport(
        @Body() { amount, source }: CreateReportDTO,
        @Param("type", new ParseEnumPipe(ReportType)) type: string
    ): ReportResponseDTO {
        const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
        return this.reportService.createReport({ amount, source }, reportType);
    }

    @Put(':id')
    updateReport(
        @Param("type", new ParseEnumPipe(ReportType)) type: string,
        @Param("id", ParseUUIDPipe) id: string,
        @Body() body: UpdateReportDTO
    ): ReportResponseDTO {
        const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
        return this.reportService.updateReport(reportType, id, body)
    }

    //@HttpCode(204)
    @Delete(':id')
    deleteReport(@Param("id", ParseUUIDPipe) id: string) {
        return this.reportService.deleteReport(id);
    }
}
