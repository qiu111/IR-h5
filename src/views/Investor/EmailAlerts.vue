<template>
  <Banner selected-nav="114003" title="IR Contact" />
  <div class="container">
    <NavText />
    <div class="ndq-content client_class">
      <h3>Subscribe to Investor Email Alerts</h3>
      <p class="description">
        To opt-in for investor email alerts, please select at least one alert option and enter your email address in
        the field below. After submitting your request, an activation email will be sent to the address provided. You
        must click the activation link in order to complete your subscription. You can sign up for additional alert
        options at any time. If you would like to opt out of email alerts, you can unsubscribe at the bottom of this
        page.
      </p>
      <div class="required-hint">
        Required fields denoted by an asterisk (<span class="asterisk">*</span>).
      </div>

      <van-form @submit="handleSubscribe">
        <van-cell-group inset>
          <van-field name="ruleForm" label="Alert Type" error required :rules="rules.alertTypes">
            <template #input>
              <van-checkbox-group v-model="ruleForm.alertTypes" direction="horizontal">
                <van-checkbox v-for="type in alertTypeList" :name="type.label" shape="square">
                  {{ type.label }}
                </van-checkbox>
              </van-checkbox-group>
            </template>
          </van-field>
          <van-field v-model="ruleForm.email" type="text" required name="Email" label="Email" placeholder="Email"
            :rules="rules.email" />
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit" :loading="subscribeLoading"> {{ subscribeLoading ?
            'Processing...' : 'Subscribe' }}</van-button>
        </div>
      </van-form>
    </div>
  </div>

  <!-- Unsubscribe Section -->
  <div class="background-grey">
    <div class="container">
      <h3>Unsubscribe From Investor Email Alerts</h3>
      <p class="description">
        To opt-out of investor email alerts, please enter your email address in the field below and you will be removed
        from all investor relations email alerts to which you are subscribed. After submitting your email, you will
        receive a confirmation email to the requested email address. You must click the confirmation link in order to
        complete your request to unsubscribe. You can elect to receive investor alerts at any time you would like.
      </p>
      <div class="required-hint">
        Required fields denoted by an asterisk (<span class="asterisk">*</span>).
      </div>
      <van-form @submit="handleUnsubscribe">
        <van-cell-group inset>
          <van-field v-model="unSubForm.email" type="text" required name="Email" label="Email" placeholder="Email"
            :rules="rules.email" />
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit" :loading="unsubscribeLoading">{{
            unsubscribeLoading
              ? 'Processing...' : 'Unsubscribe' }}</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup lang='ts'>

import { ref, onMounted, reactive } from 'vue';
import Banner from '@/components/Banner.vue'
import NavText from '@/components/NavText.vue'
import { useRouter } from 'vue-router'
import { mailAlerts, delAlertEmail } from '@/api/user'
import type { FieldRule } from 'vant';
import { showFailToast } from 'vant';
import 'vant/es/toast/style';


const router = useRouter()

interface RuleForm {
  alertTypes: string[]
  email: string
}
interface unSubRuleForm {
  email: string
}
interface AlertType {
  value: string
  label: string
}

const subscribeLoading = ref(false)
const unsubscribeLoading = ref(false)

const ruleForm = reactive<RuleForm>({
  alertTypes: [],
  email: ''
})

const unSubForm = reactive<unSubRuleForm>({
  email: ''
})

const rules = {
  email: [
    {
      required: true,
      message: 'Please input email address',
      trigger: 'blur'
    },
    {
      validator: (value: string) => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
      },
      message: 'Please input correct email address',
      trigger: 'onBlur'
    },
    {
      type: 'email' as const, // 明确指定为字面量类型
      message: 'Please input correct email address',
      trigger: ['blur', 'change'] as const
    }
  ] as unknown as FieldRule[],
  alertTypes: [
    {
      type: 'array' as const,
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change' as const
    }
  ] as unknown as FieldRule[]
};

const alertTypeList: AlertType[] = [
  { value: 'Stock Quote', label: 'Stock Quote' },
  { value: 'SEC Filings', label: 'SEC Filings' },
  { value: 'Financial Report', label: 'Financial Report' },
  { value: 'Events', label: 'Events' },
  { value: 'News Releases', label: 'News Releases' }
]

const handleSubscribe = async () => {
  try {
    subscribeLoading.value = true;
    const response = await mailAlerts(ruleForm);
    if (response.data.status == 200) {
      router.push('/investorEmailAlerts?nav_no=114002&id=1');
    } else {
      showFailToast('Fail in send');
    }
  } catch (error) {
    // console.error('Subscription failed:', error);
  } finally {
    subscribeLoading.value = false;
  }
}

const handleUnsubscribe = async () => {
  try {
    unsubscribeLoading.value = true;
    const response = await delAlertEmail(unSubForm);
    if (response.data.status == 200) {
      router.push('/investorEmailAlerts?nav_no=114002&id=3');
    } else {
      showFailToast('Fail in send');
    }
  } catch (error) {
    // console.error('Subscription failed:', error);
  } finally {
    unsubscribeLoading.value = false;
  }
}

onMounted(() => {
  ruleForm.alertTypes = [alertTypeList[0].value]
})

</script>
<style lang='scss'>
.ir-contact {
  margin: 40px 0 50px 0;
}

.ndq-content {
  width: 100%;
}

.description {
  color: #606266;
  margin-bottom: 20px;
  line-height: 1.5;
  font-size: 16px;
}

.required-hint {
  color: #606266;
  margin-bottom: 20px;
}

.asterisk {
  color: #f56c6c;
  margin: 0 5px;
}

.alert-form {
  margin-top: 30px;
}

.alert-checkbox {
  display: block;
  margin: 8px 0;
}

.background-grey {
  width: 100%;
  background-color: #f7f7f7;
  padding: 50px 0;
}

.van-checkbox--horizontal {
  margin-bottom: 15px;
}
</style>