import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsDate, IsObject, IsOptional, IsString, MinLength} from 'class-validator';

export class MessageDto {
  @ApiProperty({
    description: 'The version of the CloudEvents specification which the event uses.',
    example: '1.0',
  })
  @IsString()
  @MinLength(1)
  specversion: string;

  @ApiProperty({
    description: 'Describes the type of event related to the originating occurrence.',
    example: ['com.github.pull_request.opened', 'com.example.object.deleted.v2'],
  })
  @IsString()
  @MinLength(1)
  type: string;

  @ApiProperty({
    description: 'Identifies the event.',
    example: 'A234-1234-1234',
  })
  @IsString()
  @MinLength(1)
  id: string;

  @ApiProperty({
    description: 'Identifies the context in which an event happened.',
    examples: [
      'https://github.com/cloudevents',
      'mailto:cncf-wg-serverless@lists.cncf.io',
      'urn:uuid:6e8bc430-9c3a-11d9-9669-0800200c9a66',
      'cloudevents/spec/pull/123',
      '/sensors/tn-1234567/alerts',
      '1-555-123-4567',
    ],
  })
  @IsString()
  @MinLength(1)
  source: string;

  @ApiPropertyOptional({
    description: 'Content type of the data value. Must adhere to RFC 2046 format.',
    examples: ['text/xml', 'application/json', 'image/png', 'multipart/form-data'],
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  datacontenttype?: string;

  @ApiPropertyOptional({
    description: 'Identifies the schema that data adheres to.',
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  dataschema?: string;

  @ApiPropertyOptional({
    description: 'Describes the subject of the event in the context of the event producer (identified by source).',
    example: 'mynewfile.jpg',
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  subject?: string;

  @ApiPropertyOptional({
    description: 'The version of the CloudEvents specification which the event uses.',
    example: '1.0',
  })
  @IsOptional()
  @IsDate()
  time?: Date;

  @IsObject()
  data?: any;
}
