import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class TokenInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.headers.get('skip'))
            return next.handle(req);
        if(localStorage.getItem("token")){
            const authHeader = req.clone({
                headers: req.headers.set("Authorization", localStorage.getItem("token")!)
            })
            req = authHeader
        }
        return next.handle(req)
    }
    
}