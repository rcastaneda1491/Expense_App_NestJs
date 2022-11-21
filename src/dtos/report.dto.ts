/* eslint-disable prettier/prettier */
import { MaxLength, IsNumber, IsPositive, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ReportType } from 'src/data';
import { Exclude, Expose } from 'class-transformer';

export class CreateReportDTO {
    @IsNumber()
    @IsPositive()
    amount: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    source: string;
}

export class UpdateReportDTO {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    amount: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    source: string;
}

export class ReportResponseDTO {
    constructor(partial: Partial<ReportResponseDTO>) {
        Object.assign(this, partial)
    }

    id: string;
    source: string;
    amount: number;

    @Expose({ name: "createdAt" })
    transfromCreatedAt() {
        return this.created_at;
    }

    @Exclude()
    created_at: Date;

    @Exclude()
    updated_at: Date;
    type: ReportType;
}