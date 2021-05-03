import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class DiscordService {
  private _discordEndpoint =
    environment.discord.host +
    environment.discord.serverId +
    environment.discord.webHook;

  private _botUsername = environment.discord.botUsername;

  errorColor = '#C70039';
  warningColor = '#E8BB1A';

  constructor(private http: HttpClient) {}

  sendErrorMessage(message: string) {
    const data = {
      username: this._botUsername,
      embeds: [
        {
          title: 'ERROR!',
          description: message,
          footer: {
            text: `BUG: ${
              environment.production ? 'production' : 'development'
            }`,
          },
          timestamp: new Date().toISOString,
          color: this._hexToDecimal(this.errorColor),
        },
      ],
    };
    return this._sendMessage(data);
  }

  sendWarningMessage(message: string) {
    const data = {
      username: this._botUsername,
      embeds: [
        {
          title: 'WARNING!',
          description: message,
          footer: {
            text: `ISSUE: ${
              environment.production ? 'production' : 'development'
            }`,
          },
          timestamp: new Date().toISOString,
          color: this._hexToDecimal(this.warningColor),
        },
      ],
    };
    this._sendMessage(data);
  }

  private _sendMessage(data: any) {
    this.http
      .post(this._discordEndpoint, data, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .subscribe();
  }

  private _hexToDecimal(hex: string) {
    return parseInt(hex.replace('#', ''), 16);
  }
}
