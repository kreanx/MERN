import React from "react"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"
import Avatar from "@mui/material/Avatar"

import styles from "./Login.module.scss"
import {fetchAuth, fetchRegister, selectIsAuth} from "../../redux/slices/auth"
import {Navigate} from "react-router-dom"
import {useForm} from "react-hook-form"
import {useDispatch, useSelector} from "react-redux"

export const Registration = () => {
    const isAuth = useSelector(selectIsAuth)

    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isValid},
    } = useForm({
        defaultValues: {
            fullName: "Некит Ермаков",
            email: "nekit@test.ru",
            password: "12345",
        },
        mode: "onChange",
    })

    const onSubmit = async (values) => {
        const data = await dispatch(fetchRegister(values))

        if (!data.payload) {
            alert("Не удалось зарегистрироваться")
        }

        dispatch(fetchAuth(values))
        if ("token" in data.payload) {
            window.localStorage.setItem("token", data.payload.token)
        }
    }

    React.useEffect(() => {}, [])

    if (isAuth) {
        return <Navigate to="/" />
    }

    return (
        <Paper elevation={0} classes={{root: styles.root}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography classes={{root: styles.title}} variant="h5">
                    Создание аккаунта
                </Typography>
                <div className={styles.avatar}>
                    <Avatar sx={{width: 100, height: 100}} />
                </div>
                <TextField
                    error={Boolean(errors.fullName?.message)}
                    helperText={errors.fullName?.message}
                    {...register("fullName", {required: "Укажите полное имя"})}
                    fullWidth
                    className={styles.field}
                    label="Полное имя"
                />
                <TextField
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    {...register("email", {required: "Укажите почту"})}
                    fullWidth
                    className={styles.field}
                    label="E-Mail"
                />
                <TextField
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    {...register("password", {required: "Укажите пароль"})}
                    fullWidth
                    className={styles.field}
                    label="Пароль"
                    type="password"
                />
                <Button
                    disabled={!isValid}
                    type="submit"
                    size="large"
                    variant="contained"
                    fullWidth
                >
                    Зарегистрироваться
                </Button>
            </form>
        </Paper>
    )
}
