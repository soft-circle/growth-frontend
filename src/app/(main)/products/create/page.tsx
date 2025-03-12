'use client';

import { useMutation } from '@tanstack/react-query';

import { HttpClient } from '@/api/http-client';
import Button from '@/components/Button';
import Container from '@/components/Container';
import FieldLabel from '@/components/FieldLabel';
import FileField from '@/components/FileField';
import Form from '@/components/Form';
import FormFieldArray from '@/components/FormFieldArray';
import NumberField from '@/components/NumberField';
import Partition from '@/components/Partition';
import RadioGroupField from '@/components/RadioGroupField';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/Table';
import TextBlock from '@/components/TextBlock';
import TextField from '@/components/TextField';
import ToggleGroupField from '@/components/ToggleGroupField';

import type {
  ProductCreateDTO,
  ProductOptionCreateDTO,
} from '@/api/data-contracts';

type ProductCreateFormValues = Omit<ProductCreateDTO, 'options'> & {
  options: (Omit<ProductOptionCreateDTO, 'optionImage' | 'growthBarcodeImage'> & {
    optionImage?: File;
    growthBarcodeImage?: File;
  })[];
};

// TODO: enum
const markets = [
  { id: 'growth', name: '쿠팡 그로스' },
  { id: 'coupang', name: '쿠팡 일반' },
  { id: 'naver', name: '네이버' },
  { id: 'gmarket', name: '지마켓' },
  { id: 'auction', name: '옥션' },
  { id: 'elevenStreet', name: '11번가' },
];

const productOptionDefaultValues: ProductCreateFormValues['options'][number] = {
  name: '',
  optionImage: undefined,
  growthProductOptionCode: '',
  coupangProductOptionCode: '',
  naverProductOptionCode: '',
  gmarketProductOptionCode: '',
  auctionProductOptionCode: '',
  elevenStreetProductOptionCode: '',
  growthSalesUnit: undefined,
  coupangSalesUnit: undefined,
  naverSalesUnit: undefined,
  gmarketSalesUnit: undefined,
  auctionSalesUnit: undefined,
  elevenStreetSalesUnit: undefined,
  width: undefined,
  height: undefined,
  length: undefined,
  weight: undefined,
  customerDeliveryFee: undefined,
  growthBarcode: '',
  growthBarcodeImage: undefined,
  warehouseSection: '',
};

function ProductAdd() {
  const createProductMutation = useMutation({
    mutationFn: async (data: ProductCreateFormValues) => {
      const { options = [], ...productData } = data;
      const formData = new FormData();
      formData.append(
        'dto',
        JSON.stringify({
          ...productData,
          options: options.map(({ optionImage, growthBarcodeImage, ...option }) => ({
            ...option,
            optionImage: optionImage?.name,
            growthBarcodeImage: growthBarcodeImage?.name,
          })),
        }),
      );
      options.forEach((option) => {
        if (option.optionImage) {
          formData.append('optionImages', option.optionImage);
        }
        if (option.growthBarcodeImage) {
          formData.append('growthBarcodeImages', option.growthBarcodeImage);
        }
      });
      const httpClient = new HttpClient();
      httpClient.request({
        path: '/products/create',
        method: 'POST',
        body: formData,
        format: 'formdata',
      });
    },
  });

  return (
    <Container>
      <Form<ProductCreateFormValues>
        defaultValues={{
          name: '',
          brandName: '',
          growthProductCode: '',
          coupangProductCode: '',
          naverProductCode: '',
          gmarketProductCode: '',
          auctionProductCode: '',
          elevenStreetProductCode: '',
          accountType: '',
          seasonMonths: [],
          seasonThemes: [],
          originalSeller: '',
          options: [productOptionDefaultValues],
        }}
        onSubmit={(values) => {
          createProductMutation.mutate(values);
        }}
      >
        {({ control }) => (
          <>
            <TextField
              name="name"
              label="상품명"
            />
            <TextField
              name="brandName"
              label="브랜드명"
            />
            <div>
              <FieldLabel>
                마켓별 상품코드
              </FieldLabel>
              <div className="border border-input rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-24" />
                      {
                        markets.map((market) => (
                          <TableHead
                            key={market.id}
                            className="min-w-40"
                          >
                            {market.name}
                          </TableHead>
                        ))
                      }
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        상품코드
                      </TableCell>
                      {
                        markets.map((market) => (
                          <TableCell
                            key={market.id}
                          >
                            <TextField
                              name={`${market.id}ProductCode`}
                            />
                          </TableCell>
                        ))
                      }
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
            <RadioGroupField
              name="accountType"
              label="계정 타입"
              options={[
                { value: 'c', label: '법인' },
                { value: 'i', label: '개인' },
              ]}
            />
            <ToggleGroupField
              name="seasonMonths"
              label="시즌"
              options={Array.from(Array(12)).map((_, i) => ({
                value: `${i + 1}`,
                label: `${i + 1}월`,
              }))}
              variant="outline"
              size="sm"
              fitted
              multiple
            />
            <TextField
              name="originalSeller"
              label="판매자"
            />
            <div>
              <FieldLabel>
                상품옵션
              </FieldLabel>
              <div className="space-y-4">
                <FormFieldArray
                  name="options"
                  control={control}
                >
                  {({ fields, append }) => (
                    <>
                      {
                        fields.map((field, i) => (
                          <div
                            key={field.id}
                            className="bg-gray-50 rounded-md border border-gray-300 p-3 space-y-6"
                          >
                            <TextField
                              name={`options.${i}.name`}
                              label="옵션명"
                            />
                            <FileField
                              name={`options.${i}.optionImage`}
                              label="옵션 이미지"
                              accept="image/*"
                            />
                            <div>
                              <FieldLabel>
                                규격
                              </FieldLabel>
                              <div className="space-y-2">
                                <Partition space={2} valign="center">
                                  <Partition.Side className="w-10">
                                    <TextBlock typography="body.xs">
                                      가로
                                    </TextBlock>
                                  </Partition.Side>
                                  <Partition.Main>
                                    <NumberField
                                      name={`options.${i}.width`}
                                    />
                                  </Partition.Main>
                                </Partition>
                                <Partition space={2} valign="center">
                                  <Partition.Side className="w-10">
                                    <TextBlock typography="body.xs">
                                      세로
                                    </TextBlock>
                                  </Partition.Side>
                                  <Partition.Main>
                                    <NumberField
                                      name={`options.${i}.length`}
                                    />
                                  </Partition.Main>
                                </Partition>
                                <Partition space={2} valign="center">
                                  <Partition.Side className="w-10">
                                    <TextBlock typography="body.xs">
                                      높이
                                    </TextBlock>
                                  </Partition.Side>
                                  <Partition.Main>
                                    <NumberField
                                      name={`options.${i}.height`}
                                    />
                                  </Partition.Main>
                                </Partition>
                                <Partition space={2} valign="center">
                                  <Partition.Side className="w-10">
                                    <TextBlock typography="body.xs">
                                      무게
                                    </TextBlock>
                                  </Partition.Side>
                                  <Partition.Main>
                                    <NumberField
                                      name={`options.${i}.weight`}
                                    />
                                  </Partition.Main>
                                </Partition>
                              </div>
                            </div>
                            <NumberField
                              name={`options.${i}.customerDeliveryFee`}
                              label="고객배송비"
                            />
                            <TextField
                              name={`options.${i}.warehouseSection`}
                              label="창고 섹션 번호"
                            />
                            <div>
                              <FieldLabel>
                                마켓별 옵션 정보
                              </FieldLabel>
                              <div className="border border-input rounded-md">
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead className="min-w-24" />
                                      {
                                        markets.map((market) => (
                                          <TableHead
                                            key={market.id}
                                            className="min-w-40"
                                          >
                                            {market.name}
                                          </TableHead>
                                        ))
                                      }
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    <TableRow>
                                      <TableCell>
                                        옵션코드
                                      </TableCell>
                                      {
                                        markets.map((market) => (
                                          <TableCell
                                            key={market.id}
                                          >
                                            <TextField
                                              name={`options.${i}.${market.id}ProductOptionCode`}
                                            />
                                          </TableCell>
                                        ))
                                      }
                                    </TableRow>
                                    <TableRow>
                                      <TableCell>
                                        판매 단위
                                      </TableCell>
                                      {
                                        markets.map((market) => (
                                          <TableCell
                                            key={market.id}
                                          >
                                            <NumberField
                                              name={`options.${i}.${market.id}SalesUnit`}
                                            />
                                          </TableCell>
                                        ))
                                      }
                                    </TableRow>
                                    <TableRow>
                                      <TableCell>
                                        바코드
                                      </TableCell>
                                      {
                                        markets.map((market) => (
                                          <TableCell
                                            key={market.id}
                                          >
                                            {
                                              market.id === 'growth'
                                                ? (
                                                  <TextField
                                                    name={`options.${i}.growthBarcode`}
                                                  />
                                                )
                                                : null
                                            }
                                          </TableCell>
                                        ))
                                      }
                                    </TableRow>
                                    <TableRow>
                                      <TableCell>
                                        바코드 이미지
                                      </TableCell>
                                      {
                                        markets.map((market) => (
                                          <TableCell
                                            key={market.id}
                                          >
                                            {
                                              market.id === 'growth'
                                                ? (
                                                  <FileField
                                                    name={`options.${i}.growthBarcodeImage`}
                                                    accept="image/*"
                                                  />
                                                )
                                                : null
                                            }
                                          </TableCell>
                                        ))
                                      }
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </div>
                            </div>
                          </div>
                        ))
                      }
                      <div className="bg-gray-50 rounded-md border border-gray-300 p-3 flex justify-center pt-4">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => append(productOptionDefaultValues)}
                        >
                          옵션 추가
                        </Button>
                      </div>
                    </>
                  )}
                </FormFieldArray>
              </div>
            </div>
            <div className="pt-8">
              <Button
                type="submit"
                fullWidth
              >
                상품 등록
              </Button>
            </div>
          </>
        )}
      </Form>
    </Container>
  );
}

export default ProductAdd;
