import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, Status, TravelMode } from '@googlemaps/google-maps-services-js';

@Injectable()
export class GoogleMapsApiService {
  private readonly apiKey: string;
  private readonly client: Client;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get('GOOGLE_MAPS_API_KEY');
    this.client = new Client({});
  }

  public async isValidAddress(address: string) {
    const response = await this.client.geocode({
      params: {
        address,
        key: this.configService.get('GOOGLE_MAPS_API_KEY'),
      },
    });

    return response.data.status === Status.OK;
  }

  public async getDistance(
    startAddress: string,
    destinationAddress: string,
    mode = TravelMode.bicycling,
  ) {
    const response = await this.client.distancematrix({
      params: {
        mode,
        origins: [startAddress],
        destinations: [destinationAddress],
        key: this.configService.get('GOOGLE_MAPS_API_KEY'),
      },
    });

    if (response.data.status === Status.OK) {
      const element = response.data.rows[0].elements[0];

      if (element && element.distance) {
        return element.distance.value;
      }
    }

    throw new InternalServerErrorException(`Could not get distance between addresses`);
  }
}
