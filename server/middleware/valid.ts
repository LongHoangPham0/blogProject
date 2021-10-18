import { Request, Response, NextFunction } from 'express'

export const validRegister = async (req: Request, res: Response, next: NextFunction) => {
    const { name, account, password = [], errors = [] } = req.body

    

    if(!name) {
        errors.push('Vui lòng nhập họ và tên.')
    }else if(name.length > 20) {
        errors.push('Họ và tên chỉ dài tối đa 20 ký tự!') 
    }

    if(!account) {
        errors.push('Nhập địa chỉ email hoặc số điện thoại.')
    }else if(!validPhone(account) && !validateEmail(account)) {
        errors.push('Địa chỉ email hoặc số điện thoại không đúng, xin vui lòng nhập lại!') 
    }

    if(password.length < 6){
        errors.push("Mật khẩu phải dài ít nhất 6 ký tự!")
    }

    
    if(errors.length > 0) return res.status(400).json({msg: errors})
    
    next();
} 


export function validPhone(phone: string) {
    const re = /^[+]/g
    return re.test(phone)
  }
  
export function validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

