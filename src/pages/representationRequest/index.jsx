import "./representationRequest.scss";
import Order from "@/assets/images/icons/myOrder.svg";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextareaAutosize } from "@mui/base";
const RepresentationRequest = () => {
  return (
    <section className="representation-request">
      <section className="representation-request__header">
        <img className="logo" src={Order} alt="" />
        <span className="title">درخواست نمایندگی</span>
      </section>
      <section className="representation-request__content">
        <Box sx={{ width: "80%", margin: "0 auto" }}>
          <Grid
            container
            spacing={{ xs: 1, sm: 1, md: 1 }}
            columns={{ xs: 12, sm: 12, md: 12 }}
          >
            <Grid xs={6} sm={6} md={6}>
              <section className="holder-element">
                <span className="label">نام</span>
                <TextField variant="outlined" size="small" />
              </section>
            </Grid>
            <Grid xs={6} sm={6} md={6}>
              <section className="holder-element">
                <span className="label">نام خانوادگی</span>
                <TextField variant="outlined" size="small" />
              </section>
            </Grid>
            <Grid xs={6} sm={6} md={12}>
              <section className="holder-element">
                <span className="label">کد ملی</span>
                <TextField variant="outlined" size="small" />
              </section>
            </Grid>
            <Grid xs={6} sm={6} md={6}>
              <section className="holder-element">
                <span className="label">شغل</span>
                <TextField variant="outlined" size="small" />
              </section>
            </Grid>
            <Grid xs={6} sm={6} md={6}>
              <section className="holder-element">
                <span className="label">استان محل سکونت</span>
                <FormControl size="small">
                  <Select
                    sx={{
                      height: 43,
                      backgroundColor: "#e0e0e0",
                      fontFamily: "IRANSansX",
                    }}
                  >
                    <MenuItem value={10}>تهران</MenuItem>
                    <MenuItem value={21}>مشهد</MenuItem>
                  </Select>
                </FormControl>
              </section>
            </Grid>
            <Grid xs={6} sm={6} md={12}>
              <section className="holder-element">
                <span className="label">آدرس</span>
                <TextField variant="outlined" size="small" />
              </section>
            </Grid>
            <Grid xs={12} sm={12} md={12}>
              <section className="holder-element">
                <span className="label">شماره تماس</span>
                <TextField variant="outlined" size="small" />
              </section>
            </Grid>
            <Grid xs={12} sm={12} md={12}>
              <section className="holder-element">
                <span className="label">توضیحات</span>
                <TextareaAutosize minRows="4" />
              </section>
            </Grid>
            <Grid xs={12} sm={12} md={12}>
              <Button className="register">ثبت درخواست</Button>
            </Grid>
          </Grid>
        </Box>
      </section>
    </section>
  );
};

export default RepresentationRequest;
