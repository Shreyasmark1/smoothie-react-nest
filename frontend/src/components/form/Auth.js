import { useState } from 'react'
import { Register } from "../../api/Api";
import { useSnackbar } from '../../hooks/useSnackbar';

const Auth = ({ registration }) => {

    const [loading, setLoading] = useState(false);

    const { showSnackbar } = useSnackbar()

    const submit = (e) => {

        e.preventDefault()

        const data = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value
        }

        setLoading(true)

        Register(data)
            .then((res) => {
                setLoading(false)
                console.log(res);
                showSnackbar(JSON.stringify(res))
            })
            .catch((e) => {
                setLoading(false)
                showSnackbar(e)
            })
    }

    return (
        <form onSubmit={submit}>
            {
                registration ?
                    (
                        <><h2>Sign up</h2>
                            <label htmlFor="email">Name </label>
                            <input type="text" name="name" required />
                        </>
                    ) : (<h2>Login</h2>)
            }
            <label htmlFor="email">Email</label>
            <input type="text" name="email" required />
            <div className="email error"></div>
            <label htmlFor="password">Password</label>
            <input type="password" minLength={6} name="password" required />
            <div className="password error"></div>
            {
                loading ?(<button><i className="fa fa-spinner fa-spin fa-2x" style={{color: '#FE96DF'}}></i></button>)

                    : registration ? (<button>Sign up</button>) : (<button>Login</button>)
            }
        </form>
    );
}

export default Auth;