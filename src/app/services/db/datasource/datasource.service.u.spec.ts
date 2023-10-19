import { environment as developmentEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as productionEnvironment } from 'src/environments/environment.prod';
import { DatasourceService } from './datasource.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IEnvironment } from 'src/environments/interface/ienvironment';
import { StringDto } from 'src/app/interfaces/StringDto';
import { of } from 'rxjs';

let service: DatasourceService;
let httpClientSpy: jasmine.SpyObj<HttpClient>;
const devEnv = developmentEnvironment;
const stagingEnv = stagingEnvironment;
const prodEnv = productionEnvironment;

describe('DatasourceService - unit', () => {
  const shouldHaveCorrectUrlExpectation =
    'should have the api url set by the environment';
  const shouldHaveCorrectUrl = (env: IEnvironment) => {
    const expected = env.api;
    const actual = service.URL;

    expect(actual).withContext('url should be set').toBe(expected);
  };
  describe('in dev environment', () => {
    beforeEach(() => {
      httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
      service = new DatasourceService(devEnv, httpClientSpy);
    });
    it(shouldHaveCorrectUrlExpectation, () => shouldHaveCorrectUrl(devEnv));
  });
  describe('in staging environment', () => {
    beforeEach(() => {
      httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
      service = new DatasourceService(stagingEnv, httpClientSpy);
    });
    it(shouldHaveCorrectUrlExpectation, () => shouldHaveCorrectUrl(stagingEnv));
  });
  describe('in prod environment', () => {
    beforeEach(() => {
      httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
      service = new DatasourceService(prodEnv, httpClientSpy);
    });
    it(shouldHaveCorrectUrlExpectation, () => shouldHaveCorrectUrl(prodEnv));
  });
  describe('get method', () => {
    const shouldMakeHttpCallExpectation = 'should make correct http call';
    const shouldMakeHttpCall = (env: IEnvironment) => {
      const pathToTest = 'test/get';
      const paramsToTest = new HttpParams();

      service.get(pathToTest, paramsToTest);

      expect(httpClientSpy.get)
        .withContext('get should have been called')
        .toHaveBeenCalledOnceWith(env.api + pathToTest, {
          responseType: 'json',
          params: paramsToTest,
        });
    };
    const shouldMakeHttpCallNoHttpParamsExpectation =
      'should make correct http call without http params';
    const shouldMakeHttpCallNoHttpParams = (env: IEnvironment) => {
      const pathToTest = 'test/get';

      service.get(pathToTest);

      expect(httpClientSpy.get)
        .withContext('get should have been called')
        .toHaveBeenCalledOnceWith(env.api + pathToTest, {
          responseType: 'json',
          params: jasmine.any(HttpParams),
        });
    };
    const shouldReturnStringDtoExpectation =
      'should return expected string dto';
    const shouldReturnStringDto = (done: DoneFn) => {
      const pathToTest = 'test/get';
      const paramsToTest = new HttpParams();
      const expectedMessage = 'this is a test';
      const expectedDto: StringDto = {
        message: expectedMessage,
      };
      httpClientSpy.get.and.returnValue(of(expectedDto));

      service.get<StringDto>(pathToTest, paramsToTest).subscribe({
        next: (response) => {
          expect(response)
            .withContext('response should be the dto')
            .toEqual(expectedDto);
          done();
        },
        error: done.fail,
      });

      expect(httpClientSpy.get)
        .withContext('get should have been called')
        .toHaveBeenCalledTimes(1);
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        service = new DatasourceService(devEnv, httpClientSpy);
      });
      it(shouldMakeHttpCallExpectation, () => shouldMakeHttpCall(devEnv));
      it(shouldMakeHttpCallNoHttpParamsExpectation, () =>
        shouldMakeHttpCallNoHttpParams(devEnv)
      );
      it(shouldReturnStringDtoExpectation, shouldReturnStringDto);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        service = new DatasourceService(stagingEnv, httpClientSpy);
      });
      it(shouldMakeHttpCallExpectation, () => shouldMakeHttpCall(stagingEnv));
      it(shouldMakeHttpCallNoHttpParamsExpectation, () =>
        shouldMakeHttpCallNoHttpParams(stagingEnv)
      );
      it(shouldReturnStringDtoExpectation, shouldReturnStringDto);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        service = new DatasourceService(prodEnv, httpClientSpy);
      });
      it(shouldMakeHttpCallExpectation, () => shouldMakeHttpCall(prodEnv));
      it(shouldMakeHttpCallNoHttpParamsExpectation, () =>
        shouldMakeHttpCallNoHttpParams(prodEnv)
      );
      it(shouldReturnStringDtoExpectation, shouldReturnStringDto);
    });
  });
});
