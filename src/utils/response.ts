type Response = {
  message: string;
  success: boolean;
  data: any;
}

export default function response(message: string, success: boolean = false, data: any = undefined): Response {
  return {
    message, success, data
  }
}
