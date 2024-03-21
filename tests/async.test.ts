import { Request, Response, NextFunction } from "express";
import catchAsync from "../src/utils/catchAsync";

jest.mock("express");

describe.skip("asyncMiddleware", () => {
  it.skip("should handle async function correctly", async () => {
    const mockRequest = {} as Request;
    const mockResponse = {} as Response;
    const mockNextFunction = jest.fn() as NextFunction;
    const mockHandler = jest.fn().mockResolvedValue("mocked value");

    await catchAsync(mockHandler)(mockRequest, mockResponse, mockNextFunction);

    expect(mockHandler).toHaveBeenCalledWith(
      mockRequest,
      mockResponse,
      mockNextFunction
    );
    expect(mockNextFunction).not.toHaveBeenCalled(); // assuming no error
  });

  it.skip("should pass error to next function if async function throws", async () => {
    const mockRequest = {} as Request;
    const mockResponse = {} as Response;
    const mockNextFunction = jest.fn() as NextFunction;
    const mockError = new Error("mocked error");
    // const mockError = new AppError("mocked error", 500);

    const mockHandler = jest.fn().mockRejectedValue(mockError);

    await catchAsync(mockHandler)(mockRequest, mockResponse, mockNextFunction);

    expect(mockHandler).toHaveBeenCalledWith(
      mockRequest,
      mockResponse,
      mockNextFunction
    );
    expect(mockNextFunction).toHaveBeenCalledWith(mockError);
  });
});
