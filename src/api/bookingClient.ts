import { request, APIRequestContext } from '@playwright/test';

export class BookingClient {
  private baseUrl = 'https://restful-booker.herokuapp.com';
  private requestContext!: APIRequestContext;
  private token: string = '';

  async init() {
    this.requestContext = await request.newContext({
      baseURL: this.baseUrl,
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }

  async authenticate(username = 'admin', password = 'password123') {
    const response = await this.requestContext.post('/auth', {
      data: { username, password }
    });
    const body = await response.json();
    this.token = body.token;
    return response;
  }

  async createBooking(bookingData: any) {
    return await this.requestContext.post('/booking', {
      data: bookingData
    });
  }

  async getBooking(bookingId: number | string) {
    return await this.requestContext.get(`/booking/${bookingId}`);
  }

  async updateBooking(bookingId: number, updateData: any, includeAuth = true) {
    const headers: Record<string, string> = {};
    if (includeAuth) {
      headers['Cookie'] = `token=${this.token}`;
    }

    return await this.requestContext.put(`/booking/${bookingId}`, {
      headers,
      data: updateData
    });
  }

  async partialUpdateBooking(bookingId: number, patchData: any, includeAuth = true) {
    const headers: Record<string, string> = {};
    if (includeAuth) {
      headers['Cookie'] = `token=${this.token}`;
    }

    return await this.requestContext.patch(`/booking/${bookingId}`, {
      headers,
      data: patchData
    });
  }

  async deleteBooking(bookingId: number, includeAuth = true) {
    const headers: Record<string, string> = {};
    if (includeAuth) {
      headers['Cookie'] = `token=${this.token}`;
    }

    return await this.requestContext.delete(`/booking/${bookingId}`, { headers });
  }
}
