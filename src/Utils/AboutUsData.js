import backendAxios from "../services/backendAxios";

export const getAboutUs = async () => {
    let res = await backendAxios
        .get("api/General/AboutUs")
        .then((res) => {
            return res.data.payload.sections
        })
        .catch((error) => {
            return error;
        });
    return res;
};