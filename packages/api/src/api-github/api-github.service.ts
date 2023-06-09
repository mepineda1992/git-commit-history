import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, lastValueFrom } from 'rxjs';
import { ICommitDetail } from '../interface';

const API_GITHUB = process.env.API_GITHUB;
const OWNER_GITHUB = 'mepineda1992';
const REPO_NAME = 'git-commit-history';

@Injectable()
export class ApiGithubService {

  constructor(private readonly httpService: HttpService) {

  }
  async getListCommits(): Promise<ICommitDetail[]> {
    const response = (await lastValueFrom(
      this.httpService
        .get(
          `${API_GITHUB}/repos/${OWNER_GITHUB}/${REPO_NAME}/commits`,
          {
            headers: {
              'X-GitHub-Api-Version': '2022-11-28',
              'Accept': 'application/vnd.github+json',
            },
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw (error);
          }),
        ),
    ));



    return response.data.map(row => {

      const { html_url: url, sha, commit: { author: { name: author, email, date }, message: description } } = row;
      return { sha, url, author, email, description, date }
    });
  }

}
