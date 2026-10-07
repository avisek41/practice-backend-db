import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MinLength,
  IsNumber,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5, {
    message: 'Title is too short! Must be at least 5 characters.',
  })
  title: string;

  @IsString()
  @IsOptional() // optional
  subtitle: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10, {
    message: 'Content is too short! Must be at least 10 characters.',
  })
  content: string;

  @IsNumber()
  @IsNotEmpty()
  authorId: number;
}
