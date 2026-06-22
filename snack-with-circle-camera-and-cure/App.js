import * as React from 'react';
import { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator, StyleSheet, Linking } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Svg, { Circle, Line } from 'react-native-svg';

//const API_URL = 'https://greeter-darling-prowess.ngrok-free.dev/predict_nonform';
const API_URL = 'https://greeter-darling-prowess.ngrok-free.dev/predict_base64';

const SUB_COLORS = ['#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#3498db'];

const productData = {
  "Acne": [
    {
      "name": "Acsolve Topical Lotion",
      "image": require("./assets/PFC-Updated/Acne/acsolve_topical_lotion.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Adapco Cream",
      "image": require("./assets/PFC-Updated/Acne/adapco_cream.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Adapco Gel",
      "image": require("./assets/PFC-Updated/Acne/adapco_gel.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Benclin Gel",
      "image": require("./assets/PFC-Updated/Acne/benclin_gel.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Benzacide Bar",
      "image": require("./assets/PFC-Updated/Acne/benzacide_bar.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Mandelac Face Wash",
      "image": require("./assets/PFC-Updated/Acne/mandelac_face_wash.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Maxinoin Capsules",
      "image": require("./assets/PFC-Updated/Acne/maxinoin_capsules.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Saniderm Pimple Patch",
      "image": require("./assets/PFC-Updated/Acne/saniderm_pimple_patch.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Skin A Cream",
      "image": require("./assets/PFC-Updated/Acne/skin_a_cream.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Skinoren Cream",
      "image": require("./assets/PFC-Updated/Acne/skinoren_cream.webp"),
      "url": "https://google.com"
    },
  ],
  "Blackheads": [
    {
      "name": "Adapalene Gel",
      "image": require("./assets/PFC-Updated/Blackheads/adapalene_gel.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Antimicrobial Purifying Mist",
      "image": require("./assets/PFC-Updated/Blackheads/antimicrobial_purifying_mist.webp"),
      "url": "https://google.com"
    },
    {
      "name": "BALANCEFUL Toner Pad",
      "image": require("./assets/PFC-Updated/Blackheads/balanceful_toner_pad.webp"),
      "url": "https://google.com"
    },
    {
      "name": "BHA Peeling Ampoule",
      "image": require("./assets/PFC-Updated/Blackheads/bha_peeling_ampoule.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Calm Down",
      "image": require("./assets/PFC-Updated/Blackheads/calm_down.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Cheer Up",
      "image": require("./assets/PFC-Updated/Blackheads/cheer_up.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Heartleaf",
      "image": require("./assets/PFC-Updated/Blackheads/heartleaf.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Mandelic Acid",
      "image": require("./assets/PFC-Updated/Blackheads/mandelic_acid.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Porebright Serum N10",
      "image": require("./assets/PFC-Updated/Blackheads/porebright_serum_n10.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Toleriane Purifying Foaming Cleanser",
      "image": require("./assets/PFC-Updated/Blackheads/toleriane_purifying_foaming_cleanser.webp"),
      "url": "https://google.com"
    },
  ],
  "Dark-Spots": [
    {
      "name": "AXIS-Y",
      "image": require("./assets/PFC-Updated/Dark-Spots/axis_y.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Anua Niacinamide 5 TXA Brightening Pad",
      "image": require("./assets/PFC-Updated/Dark-Spots/anua_niacinamide_5_txa_brightening_pad.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Anua Niacinamide",
      "image": require("./assets/PFC-Updated/Dark-Spots/anua_niacinamide.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Goodal Green Tangerine",
      "image": require("./assets/PFC-Updated/Dark-Spots/goodal_green_tangerine.webp"),
      "url": "https://google.com"
    },
    {
      "name": "La Prairie Cellular 3-Minute Peel",
      "image": require("./assets/PFC-Updated/Dark-Spots/la_prairie_cellular_3_minute_peel.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Medicube Kojic Acid Turmeric Night Wrapping Mask",
      "image": require("./assets/PFC-Updated/Dark-Spots/medicube_kojic_acid_turmeric_night_wrapping_mask.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Mela B3 Serum",
      "image": require("./assets/PFC-Updated/Dark-Spots/mela_b3_serum.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Olay Vitamin C Hydrating Moisturizer",
      "image": require("./assets/PFC-Updated/Dark-Spots/olay_vitamin_c_hydrating_moisturizer.webp"),
      "url": "https://google.com"
    },
    {
      "name": "SkinCeuticals Metacell Renewal B3",
      "image": require("./assets/PFC-Updated/Dark-Spots/skinceuticals_metacell_renewal_b3.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Tranexamic Acid + Glutathione Eye Cream",
      "image": require("./assets/PFC-Updated/Dark-Spots/tranexamic_acid_glutathione_eye_cream.webp"),
      "url": "https://google.com"
    },
  ],
  "Dry-Skin": [
    {
      "name": "Dermive Moisturizer Lotion",
      "image": require("./assets/PFC-Updated/Dry-Skin/dermive_moisturizer_lotion.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Hydrolatum Bar",
      "image": require("./assets/PFC-Updated/Dry-Skin/hydrolatum_bar.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Hydrophil Moisturizing Lotion",
      "image": require("./assets/PFC-Updated/Dry-Skin/hydrophil_moisturizing_lotion.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Mixit Ointment",
      "image": require("./assets/PFC-Updated/Dry-Skin/mixit_ointment.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Neuage Moisturizer Lotion",
      "image": require("./assets/PFC-Updated/Dry-Skin/neuage_moisturizer_lotion.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Pure glycerine",
      "image": require("./assets/PFC-Updated/Dry-Skin/pure_glycerine.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Pureglycerine",
      "image": require("./assets/PFC-Updated/Dry-Skin/pureglycerine.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Sofner Moisturizing Lotion",
      "image": require("./assets/PFC-Updated/Dry-Skin/sofner_moisturizing_lotion.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Suncoat Gel",
      "image": require("./assets/PFC-Updated/Dry-Skin/suncoat_gel.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Zarnol Lotion",
      "image": require("./assets/PFC-Updated/Dry-Skin/zarnol_lotion.webp"),
      "url": "https://google.com"
    },
  ],
  "Englarged-Pores": [
    {
      "name": "BeautyStat Universal C Skin Refiner",
      "image": require("./assets/PFC-Updated/Englarged-Pores/beautystat_universal_c_skin_refiner.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Fenty Beauty Fat Water Toner Essence",
      "image": require("./assets/PFC-Updated/Englarged-Pores/fenty_beauty_fat_water_toner_essence.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Glossier Super Pure Niacinamide + Zinc",
      "image": require("./assets/PFC-Updated/Englarged-Pores/glossier_super_pure_niacinamide_zinc.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Kate Somerville ExfoliKate",
      "image": require("./assets/PFC-Updated/Englarged-Pores/kate_somerville_exfolikate.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Paula's Choice Daily Treatment with 2% BHA",
      "image": require("./assets/PFC-Updated/Englarged-Pores/paula_s_choice_daily_treatment_with_2_bha.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Paula's Choice Invisible Finish Moisture Gel",
      "image": require("./assets/PFC-Updated/Englarged-Pores/paula_s_choice_invisible_finish_moisture_gel.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Perricone MD Intensive Pore Minimizing Toner",
      "image": require("./assets/PFC-Updated/Englarged-Pores/perricone_md_intensive_pore_minimizing_toner.webp"),
      "url": "https://google.com"
    },
    {
      "name": "RoC Retinol Correxion Night Cream",
      "image": require("./assets/PFC-Updated/Englarged-Pores/roc_retinol_correxion_night_cream.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Sweet Orange Brightening Cleanser",
      "image": require("./assets/PFC-Updated/Englarged-Pores/sweet_orange_brightening_cleanser.jpg"),
      "url": "https://google.com"
    },
    {
      "name": "e.l.f. Poreless Putty Primer",
      "image": require("./assets/PFC-Updated/Englarged-Pores/e_l_f_poreless_putty_primer.webp"),
      "url": "https://google.com"
    },
  ],
  "Eyebags": [
    {
      "name": "BIOAQUA Eye Esence Serum",
      "image": require("./assets/PFC-Updated/Eyebags/bioaqua_eye_esence_serum.webp"),
      "url": "https://google.com"
    },
    {
      "name": "CeraVe Eye Repair Cream",
      "image": require("./assets/PFC-Updated/Eyebags/cerave_eye_repair_cream.jpg"),
      "url": "https://google.com"
    },
    {
      "name": "Gel Eye Mask",
      "image": require("./assets/PFC-Updated/Eyebags/gel_eye_mask.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Instant Eye Bag Removal Patch",
      "image": require("./assets/PFC-Updated/Eyebags/instant_eye_bag_removal_patch.webp"),
      "url": "https://google.com"
    },
    {
      "name": "JOMTAM Retinol Caviar Eye Cream",
      "image": require("./assets/PFC-Updated/Eyebags/jomtam_retinol_caviar_eye_cream.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Kiehl's Avocado Eye Treatment",
      "image": require("./assets/PFC-Updated/Eyebags/kiehl_s_avocado_eye_treatment.jpg"),
      "url": "https://google.com"
    },
    {
      "name": "RoC Retinol Correxion",
      "image": require("./assets/PFC-Updated/Eyebags/roc_retinol_correxion.jpg"),
      "url": "https://google.com"
    },
    {
      "name": "Rose Hyaluronic Acid",
      "image": require("./assets/PFC-Updated/Eyebags/rose_hyaluronic_acid.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Wonder Blueberry Eye Cream",
      "image": require("./assets/PFC-Updated/Eyebags/wonder_blueberry_eye_cream.webp"),
      "url": "https://google.com"
    },
    {
      "name": "goPure NEW Instant Lift Eye Gel",
      "image": require("./assets/PFC-Updated/Eyebags/gopure_new_instant_lift_eye_gel.jpg"),
      "url": "https://google.com"
    },
  ],
  "Normal Skin": [
  ],
  "Oily-Skin": [
    {
      "name": "Bubble Level Up Balancing Moisturizer",
      "image": require("./assets/PFC-Updated/Oily-Skin/bubble_level_up_balancing_moisturizer.jpg"),
      "url": "https://google.com"
    },
    {
      "name": "Buttah Skin Oil-Free Hyaluronic Gel",
      "image": require("./assets/PFC-Updated/Oily-Skin/buttah_skin_oil_free_hyaluronic_gel.jpg"),
      "url": "https://google.com"
    },
    {
      "name": "CeraVe Foaming Facial Cleanser",
      "image": require("./assets/PFC-Updated/Oily-Skin/cerave_foaming_facial_cleanser.jpg"),
      "url": "https://google.com"
    },
    {
      "name": "CeraVe Oil Control Moisturizing Gel-Cream",
      "image": require("./assets/PFC-Updated/Oily-Skin/cerave_oil_control_moisturizing_gel_cream.jpg"),
      "url": "https://google.com"
    },
    {
      "name": "Cetaphil Daily Facial Cleanser",
      "image": require("./assets/PFC-Updated/Oily-Skin/cetaphil_daily_facial_cleanser.jpg"),
      "url": "https://google.com"
    },
    {
      "name": "Oil Control Face Wash",
      "image": require("./assets/PFC-Updated/Oily-Skin/oil_control_face_wash.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Saffron Complexion Builder",
      "image": require("./assets/PFC-Updated/Oily-Skin/saffron_complexion_builder.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Sunscreen SPF 60",
      "image": require("./assets/PFC-Updated/Oily-Skin/sunscreen_spf_60.webp"),
      "url": "https://google.com"
    },
    {
      "name": "natural outcome Oily Skin Cleanser",
      "image": require("./assets/PFC-Updated/Oily-Skin/natural_outcome_oily_skin_cleanser.jpg"),
      "url": "https://google.com"
    },
    {
      "name": "tea_tree_face_wash",
      "image": require("./assets/PFC-Updated/Oily-Skin/tea_tree_face_wash.webp"),
      "url": "https://google.com"
    },
  ],
  "Skin-Redness": [
    {
      "name": "Anua Azelaic Acid 10 Hyaluron",
      "image": require("./assets/PFC-Updated/Skin-Redness/anua_azelaic_acid_10_hyaluron.webp"),
      "url": "https://google.com"
    },
    {
      "name": "COSRX AC Collection Calming Foam Cleanser",
      "image": require("./assets/PFC-Updated/Skin-Redness/cosrx_ac_collection_calming_foam_cleanser.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Dr. Althea 345 Relief Cream",
      "image": require("./assets/PFC-Updated/Skin-Redness/dr_althea_345_relief_cream.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Glow Recipe Avocado Ceramide",
      "image": require("./assets/PFC-Updated/Skin-Redness/glow_recipe_avocado_ceramide.webp"),
      "url": "https://google.com"
    },
    {
      "name": "I'm From Mugwort Mask",
      "image": require("./assets/PFC-Updated/Skin-Redness/i_m_from_mugwort_mask.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Jumiso Super Soothing Cica & Aloe",
      "image": require("./assets/PFC-Updated/Skin-Redness/jumiso_super_soothing_cica_aloe.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Madagascar Centella Air-Fit Suncream",
      "image": require("./assets/PFC-Updated/Skin-Redness/madagascar_centella_air_fit_suncream.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Madagascar Centella Hyalu-Cica Blue Serum",
      "image": require("./assets/PFC-Updated/Skin-Redness/madagascar_centella_hyalu_cica_blue_serum.webp"),
      "url": "https://google.com"
    },
    {
      "name": "One Step Original Clear Skin Calming Pad",
      "image": require("./assets/PFC-Updated/Skin-Redness/one_step_original_clear_skin_calming_pad.webp"),
      "url": "https://google.com"
    },
    {
      "name": "SKIN1004 Madagascar Centella Cream",
      "image": require("./assets/PFC-Updated/Skin-Redness/skin1004_madagascar_centella_cream.webp"),
      "url": "https://google.com"
    },
  ],
  "Whiteheads": [
    {
      "name": "8% Glycolic Acid Toner Spray",
      "image": require("./assets/PFC-Updated/Whiteheads/8_glycolic_acid_toner_spray.webp"),
      "url": "https://google.com"
    },
    {
      "name": "ABP-11% Gentle Exfoliating",
      "image": require("./assets/PFC-Updated/Whiteheads/abp_11_gentle_exfoliating.webp"),
      "url": "https://google.com"
    },
    {
      "name": "ABP-22% Weekly Exfoliating",
      "image": require("./assets/PFC-Updated/Whiteheads/abp_22_weekly_exfoliating.webp"),
      "url": "https://google.com"
    },
    {
      "name": "ABP-33% Strong Exfoliating",
      "image": require("./assets/PFC-Updated/Whiteheads/abp_33_strong_exfoliating.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Acne Treatment Pads",
      "image": require("./assets/PFC-Updated/Whiteheads/acne_treatment_pads.jpg"),
      "url": "https://google.com"
    },
    {
      "name": "COSRX 7% Glycolic Acid",
      "image": require("./assets/PFC-Updated/Whiteheads/cosrx_7_glycolic_acid.jpg"),
      "url": "https://google.com"
    },
    {
      "name": "FC-3 Exfoliating Face Cleanser",
      "image": require("./assets/PFC-Updated/Whiteheads/fc_3_exfoliating_face_cleanser.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Original White Black Head Remover Machine",
      "image": require("./assets/PFC-Updated/Whiteheads/original_white_black_head_remover_machine.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Portable Electric White Head Remover",
      "image": require("./assets/PFC-Updated/Whiteheads/portable_electric_white_head_remover.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Salicylic Acid BHA-2% Encapsulated",
      "image": require("./assets/PFC-Updated/Whiteheads/salicylic_acid_bha_2_encapsulated.webp"),
      "url": "https://google.com"
    },
  ],
  "Wrinkles": [
    {
      "name": "Fresh Black Tea Firming Corset Cream",
      "image": require("./assets/PFC-Updated/Wrinkles/fresh_black_tea_firming_corset_cream.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Mary Kay TimeWise Antioxidant Moisturizer",
      "image": require("./assets/PFC-Updated/Wrinkles/mary_kay_timewise_antioxidant_moisturizer.webp"),
      "url": "https://google.com"
    },
    {
      "name": "NeoStrata Triple Firming Neck Cream",
      "image": require("./assets/PFC-Updated/Wrinkles/neostrata_triple_firming_neck_cream.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Neutrogena Rapid Wrinkle Repair",
      "image": require("./assets/PFC-Updated/Wrinkles/neutrogena_rapid_wrinkle_repair.webp"),
      "url": "https://google.com"
    },
    {
      "name": "No7 Protect & Perfect Intense Advanced Night Cream",
      "image": require("./assets/PFC-Updated/Wrinkles/no7_protect_perfect_intense_advanced_night_cream.webp"),
      "url": "https://google.com"
    },
    {
      "name": "No7 Restore & Renew Multi Action Eye Cream",
      "image": require("./assets/PFC-Updated/Wrinkles/no7_restore_renew_multi_action_eye_cream.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Olay Regenerist Micro-Sculpting Cream",
      "image": require("./assets/PFC-Updated/Wrinkles/olay_regenerist_micro_sculpting_cream.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Olay Regenerist Retinol 24 Night Facial Cream",
      "image": require("./assets/PFC-Updated/Wrinkles/olay_regenerist_retinol_24_night_facial_cream.webp"),
      "url": "https://google.com"
    },
    {
      "name": "Philosophy Anti-Wrinkle Miracle Worker",
      "image": require("./assets/PFC-Updated/Wrinkles/philosophy_anti_wrinkle_miracle_worker.webp"),
      "url": "https://google.com"
    },
    {
      "name": "RoC Skincare Multi Correxion Even Tone + Lift",
      "image": require("./assets/PFC-Updated/Wrinkles/roc_skincare_multi_correxion_even_tone_lift.webp"),
      "url": "https://google.com"
    },
  ],
};



export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [screen, setScreen] = useState('camera');
  const [photo, setPhoto] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [facing, setFacing] = useState('back');
  const cam = useRef(null);

  const toggleFacing = () => setFacing(f => f === 'back' ? 'front' : 'back');

  const snap = async () => {
    if (!cam.current) return;
    const p = await cam.current.takePictureAsync({ quality: 0.6 });
    setPhoto(p.uri);
    setResult(null);
  };

  const send = async () => {
    setLoading(true);
    setScreen('result');
    try {
      const response = await fetch(photo);
      const blob = await response.blob();
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file: base64 }),
      });
      const text = await res.text();
      console.log('Raw response:', text);
      setResult(JSON.parse(text));
      
    } catch (e) {
      setResult({ error: e.message });
    }
    setLoading(false);
  };

  if (!permission) return <View style={s.center}><Text style={s.txt}>Loading...</Text></View>;

  if (!permission.granted) return (
    <View style={s.center}>
      <Text style={s.txt}>Camera permission needed</Text>
      <TouchableOpacity style={s.btn} onPress={requestPermission}>
        <Text style={s.btnTxt}>Grant Permission</Text>
      </TouchableOpacity>
    </View>
  );

  // ── CAMERA SCREEN ──────────────────────────────────────────
  if (screen === 'camera') return (
    <View style={{ flex: 1 }}>
      <CameraView ref={cam} style={{ flex: 1 }} facing={facing} />
      <TouchableOpacity style={s.flipBtn} onPress={toggleFacing}>
        <Text style={{ fontSize: 28 }}>🔄</Text>
      </TouchableOpacity>
      {photo && <Image source={{ uri: photo }} style={s.preview} />}
      <View style={s.bar}>
        {!photo ? (
          <TouchableOpacity style={s.btn} onPress={snap}>
            <Text style={s.btnTxt}>📷 Take Photo</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TouchableOpacity style={[s.btn, { backgroundColor: '#555' }]} onPress={() => setPhoto(null)}>
              <Text style={s.btnTxt}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.btn} onPress={send}>
              <Text style={s.btnTxt}>Analyze →</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  // ── RESULT SCREEN ──────────────────────────────────────────
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#111' }} contentContainerStyle={{ padding: 16, paddingTop: 50 }}>
      <Text style={[s.txt, { fontSize: 18, marginBottom: 12 }]}>Result</Text>

      {photo && (
        <Image source={{ uri: photo }} style={{ width: '100%', height: 180, borderRadius: 12, marginBottom: 16 }} />
      )}

      {loading ? (
        <View style={{ alignItems: 'center', marginTop: 40 }}>
          <ActivityIndicator color="#007AFF" size="large" />
          <Text style={[s.txt, { marginTop: 12, color: '#aaa' }]}>Analyzing image...</Text>
        </View>

      ) : result?.error ? (
        <View style={s.errorBox}>
          <Text style={{ color: '#ff6b6b', fontSize: 14 }}>⚠️ {result.error}</Text>
        </View>

      ) : !result?.success?(<View style={s.container}>
      <View style={s.card}>
        {/* Icon Container */}
        <View style={s.iconWrapper}>
          <Svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <Circle cx="12" cy="12" r="10" />
            <Line x1="12" y1="8" x2="12" y2="12" />
            <Line x1="12" y1="16" x2="12.01" y2="16" />
          </Svg>
        </View>

        {/* Text Message */}
        <View style={s.textContainer}>
          <Text style={s.title}>No Skin Detected</Text>
          <Text style={s.subtitle}>{result.detail}.</Text>
        </View>
      </View>
    </View>):result ? (
        <View>
          {/* TOP PREDICTION CARD */}
          <Text style={s.sectionTitle}>Top Prediction</Text>
          <View style={s.topCard}>
            <View style={s.bigCircle}>
              <Text style={s.bigPct}>{(result.confidence * 100).toFixed(1)}%</Text>
              <Text style={s.bigLabel} numberOfLines={2}>{result.prediction}</Text>
            </View>
          </View>

          {/* OTHER PREDICTIONS */}
          <Text style={[s.sectionTitle, { marginTop: 24 }]}>Other Predictions</Text>
          <View style={s.subGrid}>
            {result.top_5.map((item, i) => (
              <View key={i} style={s.subWrapper}>
                <View style={[s.subCircle, { backgroundColor: SUB_COLORS[i] }]}>
                  <Text style={s.subPct}>{(item.confidence * 100).toFixed(1)}%</Text>
                </View>
                <Text style={s.subLabel} numberOfLines={2}>{item.class_name}</Text>
              </View>
            ))}
          </View>

          {/* 🛒 PRODUCTS FOR EACH OF TOP 5 PREDICTIONS */}
          {result.top_5.map((item, i) => {
            //const products = PRODUCTS_DB[item.class_name] || [];
            const products = productData[item.class_name] || [];
            if (products.length === 0) return null;

            return (
              <View key={`products-${i}`} style={{ marginTop: 28 }}>
                {/* Disease name label at top */}
                <View style={[s.diseaseLabel, { backgroundColor: SUB_COLORS[i] }]}>
                  <Text style={s.diseaseLabelTxt}>{item.class_name}</Text>
                </View>

                {/* Horizontal scroll of 10 products */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
                  {products.map((product, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={s.productCard}
                      onPress={() => Linking.openURL(product.url)}
                    >
                      <Image
                        source={product.image}
                        style={s.productImage}
                        resizeMode="cover"
                      />
                      <Text style={s.productName} numberOfLines={2}>
                        {product.name.replace(/_/g, ' ')}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            );
          })}
        </View>

      ) : null}

      <TouchableOpacity style={[s.btn, { marginTop: 28, marginBottom: 20 }]}
        onPress={() => { setScreen('camera'); setPhoto(null); setResult(null); }}>
        <Text style={s.btnTxt}>← Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  center:       { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#111' },
  txt:          { color: '#fff', fontSize: 15 },
  bar:          { backgroundColor: '#111', padding: 16, alignItems: 'center' },
  btn:          { backgroundColor: '#007AFF', paddingVertical: 12, paddingHorizontal: 28, borderRadius: 10, alignItems: 'center' },
  btnTxt:       { color: '#fff', fontWeight: '700', fontSize: 15 },
  preview:      { position: 'absolute', top: 12, right: 12, width: 90, height: 90, borderRadius: 8, borderWidth: 2, borderColor: '#fff' },
  flipBtn:      { position: 'absolute', top: 50, left: 16, backgroundColor: 'rgba(0,0,0,0.45)', borderRadius: 30, padding: 10 },

  sectionTitle: { color: '#aaa', fontSize: 13, fontWeight: '600', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 },
  topCard:      { alignItems: 'center', backgroundColor: '#1e1e1e', borderRadius: 16, paddingVertical: 28 },
  bigCircle:    { width: 150, height: 150, borderRadius: 75, backgroundColor: '#007AFF', alignItems: 'center', justifyContent: 'center', padding: 12,
                  shadowColor: '#007AFF', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.6, shadowRadius: 20, elevation: 10 },
  bigPct:       { color: '#fff', fontSize: 28, fontWeight: '800' },
  bigLabel:     { color: '#fff', fontSize: 12, fontWeight: '600', textAlign: 'center', marginTop: 4 },

  subGrid:      { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
  subWrapper:   { width: '18%', alignItems: 'center' },
  subCircle:    { width: 58, height: 58, borderRadius: 29, alignItems: 'center', justifyContent: 'center',
                  shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 8, elevation: 6 },
  subPct:       { color: '#fff', fontSize: 11, fontWeight: '800' },
  subLabel:     { color: '#ccc', fontSize: 10, textAlign: 'center', marginTop: 5 },

  errorBox:     { backgroundColor: '#2a1a1a', borderRadius: 10, padding: 16, borderWidth: 1, borderColor: '#ff6b6b' },

  // 🛒 Products section
  diseaseLabel:    { alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 },
  diseaseLabelTxt: { color: '#fff', fontWeight: '700', fontSize: 13 },
  productCard:     { width: 110, marginRight: 12, backgroundColor: '#1e1e1e', borderRadius: 12, padding: 8, alignItems: 'center' },
  productImage:    { width: 90, height: 90, borderRadius: 8, backgroundColor: '#333' },
  productName:     { color: '#fff', fontSize: 11, fontWeight: '600', textAlign: 'center', marginTop: 6, textTransform: 'capitalize' },
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    width: '100%',
    maxWidth: 400,
    gap: 16,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    // Shadow for Android
    elevation: 3,
  },
  iconWrapper: {
    backgroundColor: '#eff6ff',
    padding: 12,
    borderRadius: 50,
  },
  icon: {
    color: '#2563eb',
  },
  textContainer: {
    flex: 1, 
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
});